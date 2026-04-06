import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useVoiceAgent } from "@/hooks/useVoiceAgent";
import Waveform from "@/components/Waveform";

const VoiceAssistant = () => {
  const {
    isListening,
    status,
    statusText,
    messages,
    interim,
    toggleMic,
    mediaStream,
  } = useVoiceAgent();

  const convRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (convRef.current) {
      convRef.current.scrollTop = convRef.current.scrollHeight;
    }
  }, [messages]);

  const dotColor = {
    idle:      "#6b6358",
    listening: "#4a9eff",
    thinking:  "#c9a84c",
    speaking:  "#4ecb71",
  }[status];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(99,179,237,0.2)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Header — matches ChatDemo */}
          <div
            style={{
              background: "linear-gradient(135deg, #0d2137 0%, #0a1f35 100%)",
              borderBottom: "1px solid rgba(99,179,237,0.15)",
            }}
            className="px-4 py-3 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #c9a84c, #7a6130)" }}
            >
              🎙
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Voice Assistant</div>
              <div className="text-xs" style={{ color: "rgba(147,197,253,0.7)" }}>Pete's Inn Concierge</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: dotColor,
                  boxShadow: `0 0 6px ${dotColor}`,
                  transition: "background 0.3s",
                }}
              />
              <span className="text-xs" style={{ color: dotColor, transition: "color 0.3s" }}>
                {statusText}
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="relative" style={{ background: "#0c1c30" }}>
            <div
              ref={convRef}
              className="relative z-10 p-3 space-y-2 overflow-y-auto"
              style={{ maxHeight: "420px" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                    style={
                      msg.role === "you"
                        ? {
                            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                            color: "#ffffff",
                            borderBottomRightRadius: "4px",
                            boxShadow: "0 2px 8px rgba(99,102,241,0.4)",
                          }
                        : {
                            background: "rgba(10,24,42,0.85)",
                            backdropFilter: "blur(6px)",
                            color: "rgba(226,232,240,0.92)",
                            borderBottomLeftRadius: "4px",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Interim as faded bubble */}
              {interim && (
                <div className="flex justify-end">
                  <div
                    className="max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed italic"
                    style={{
                      background: "rgba(59,130,246,0.3)",
                      color: "rgba(255,255,255,0.6)",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    {interim}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Waveform strip */}
          {isListening && mediaStream && (
            <div style={{ background: "#0a1929", padding: "0 12px" }}>
              <Waveform stream={mediaStream} />
            </div>
          )}

          {/* Footer — mirrors ChatDemo footer */}
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{
              background: "#0a1929",
              borderTop: "1px solid rgba(99,179,237,0.1)",
            }}
          >
            <div
              className="flex-1 rounded-full px-3 py-1.5 text-xs"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(148,163,184,0.6)",
              }}
            >
              {isListening ? "Listening..." : "Press mic to speak…"}
            </div>
            <button
              onClick={toggleMic}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{
                background: isListening
                  ? "linear-gradient(135deg, #4a9eff, #3b82f6)"
                  : "linear-gradient(135deg, #c9a84c, #7a6130)",
                boxShadow: isListening ? "0 0 12px rgba(74,158,255,0.5)" : "none",
                transition: "all 0.25s ease",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={isListening ? "Stop" : "Start"}
            >
              {isListening ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="8" y1="22" x2="16" y2="22" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;