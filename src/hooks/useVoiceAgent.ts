import { useRef, useState, useCallback } from "react";

type Status = "idle" | "listening" | "thinking" | "speaking";

interface Message {
  role: "you" | "bot";
  text: string;
}

export function useVoiceAgent() {
  const [isListening, setIsListening]   = useState<boolean>(false);
  const [status, setStatus]             = useState<Status>("idle");
  const [statusText, setStatusText]     = useState<string>("Press mic to start");
  const [messages, setMessages]         = useState<Message[]>([
    { role: "bot", text: "Hello! I'm your voice assistant for Pete's Inn. Press the mic and ask me anything." },
  ]);
  const [interim, setInterim]           = useState<string>("");

  const wsRef           = useRef<WebSocket | null>(null);
  const mediaStreamRef  = useRef<MediaStream | null>(null);
  const processorRef    = useRef<ScriptProcessorNode | null>(null);
  const audioCtxRef     = useRef<AudioContext | null>(null);

  // ── Streaming playback ────────────────────────────────────────────
  const playCtxRef       = useRef<AudioContext | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const playingRef       = useRef<boolean>(false);

  const getPlayCtx = useCallback((): AudioContext => {
    if (!playCtxRef.current || playCtxRef.current.state === "closed") {
      playCtxRef.current    = new AudioContext({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;
      activeSourcesRef.current = [];
    }
    return playCtxRef.current;
  }, []);

  const stopAudio = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try { src.stop(); src.disconnect(); } catch (_) {}
    });
    activeSourcesRef.current = [];
    if (playCtxRef.current && playCtxRef.current.state !== "closed") {
      playCtxRef.current.close().catch(() => {});
      playCtxRef.current = null;
    }
    nextStartTimeRef.current = 0;
    playingRef.current = false;
  }, []);

  const scheduleChunk = useCallback((pcmBytes: ArrayBuffer) => {
    if (!playingRef.current) return;
    const ctx     = getPlayCtx();
    const int16   = new Int16Array(pcmBytes);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;

    const buf = ctx.createBuffer(1, float32.length, 24000);
    buf.copyToChannel(float32, 0);

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    activeSourcesRef.current.push(src);

    src.onended = () => {
      const idx = activeSourcesRef.current.indexOf(src);
      if (idx > -1) activeSourcesRef.current.splice(idx, 1);
    };

    const now = ctx.currentTime;
    if (nextStartTimeRef.current < now) nextStartTimeRef.current = now + 0.02;
    src.start(nextStartTimeRef.current);
    nextStartTimeRef.current += buf.duration;
  }, [getPlayCtx]);

  // ── WebSocket ─────────────────────────────────────────────────────
  const connectWS = useCallback(() => {
    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`wss://api.interactai.co.in/ws`);
    ws.binaryType   = "arraybuffer";
    wsRef.current   = ws;

    ws.onopen = () => {
      setStatus("listening");
      setStatusText("Listening...");
    };

    ws.onclose = () => {
      setStatus("idle");
      setStatusText("Disconnected");
      setIsListening(false);
      stopAudio();
    };

    ws.onerror = () => {
      setStatusText("Connection error — is the server running?");
    };

    ws.onmessage = (event: MessageEvent) => {
      if (event.data instanceof ArrayBuffer) {
        if (playingRef.current) scheduleChunk(event.data);
        return;
      }

      const msg = JSON.parse(event.data as string);

      if (msg.type === "interim") {
        setInterim(msg.text);
      } else if (msg.type === "transcript") {
        setInterim("");
        setMessages((prev) => [...prev, { role: "you", text: msg.text }]);
      } else if (msg.type === "thinking") {
        setStatus("thinking");
        setStatusText("Thinking...");
      } else if (msg.type === "response") {
        setMessages((prev) => [...prev, { role: "bot", text: msg.text }]);
      } else if (msg.type === "audio_start") {
        stopAudio();
        playingRef.current = true;
        setStatus("speaking");
        setStatusText("Speaking...");
      } else if (msg.type === "audio_end") {
        playingRef.current = false;
        const ctx = playCtxRef.current;
        if (ctx && nextStartTimeRef.current > ctx.currentTime) {
          const remaining = nextStartTimeRef.current - ctx.currentTime;
          setTimeout(() => {
            if (!playingRef.current) {
              setStatus("listening");
              setStatusText("Listening...");
            }
          }, remaining * 1000 + 100);
        } else {
          setStatus("listening");
          setStatusText("Listening...");
        }
      } else if (msg.type === "barge_in") {
        playingRef.current = false;
        stopAudio();
        setStatus("listening");
        setStatusText("Listening...");
        setInterim("");
      }
    };
  }, [scheduleChunk, stopAudio]);

  // ── Mic ───────────────────────────────────────────────────────────
  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      const ctx       = new AudioContext({ sampleRate: 16000 });
      audioCtxRef.current = ctx;
      const src       = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e: AudioProcessingEvent) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        const float32 = e.inputBuffer.getChannelData(0);
        const int16   = new Int16Array(float32.length);
        for (let i = 0; i < float32.length; i++) {
          int16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32767));
        }
        wsRef.current.send(int16.buffer);
      };

      src.connect(processor);
      processor.connect(ctx.destination);
      setIsListening(true);
      connectWS();
    } catch (err) {
      console.error("[MIC] Error:", err);
      setStatusText("Microphone access denied");
    }
  }, [connectWS]);

  const stopMic = useCallback(() => {
    if (processorRef.current)  { processorRef.current.disconnect();  processorRef.current = null; }
    if (audioCtxRef.current)   { audioCtxRef.current.close();        audioCtxRef.current = null; }
    if (mediaStreamRef.current){ mediaStreamRef.current.getTracks().forEach((t) => t.stop()); }
    if (wsRef.current)         { wsRef.current.close();              wsRef.current = null; }
    stopAudio();
    setIsListening(false);
    setStatus("idle");
    setStatusText("Press mic to start");
  }, [stopAudio]);

  const toggleMic = useCallback(() => {
    if (isListening) stopMic(); else startMic();
  }, [isListening, startMic, stopMic]);

  return {
    isListening,
    status,
    statusText,
    messages,
    interim,
    toggleMic,
    mediaStream: mediaStreamRef.current,
  };
}