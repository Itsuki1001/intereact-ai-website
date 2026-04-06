import { useEffect, useRef } from "react";

interface WaveformProps {
  stream: MediaStream;
}

const Waveform = ({ stream }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const canvas   = canvasRef.current;
    const ctx      = canvas.getContext("2d")!;
    const ac       = new AudioContext();
    const analyser = ac.createAnalyser();
    analyser.fftSize = 512;
    ac.createMediaStreamSource(stream).connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(data);
      canvas.width = canvas.offsetWidth;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(74,158,255,0.4)";
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      const step = canvas.width / data.length;
      for (let i = 0; i < data.length; i++) {
        const y = (data[i] / 128.0) * (canvas.height / 2);
        i === 0 ? ctx.moveTo(0, y) : ctx.lineTo(i * step, y);
      }
      ctx.stroke();
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ac.close();
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "48px", display: "block" }}
    />
  );
};

export default Waveform;