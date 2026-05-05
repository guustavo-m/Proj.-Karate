import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

export default function Display() {
  const [state, setState] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "luta.webm";
      a.click();
    };

    recorder.start();
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }

  useEffect(() => {
    socket.on("state", (data) => {
      setState(data);

      // controle da gravação
      if (data.recording && !mediaRecorderRef.current) {
        startRecording();
      }

      if (!data.recording && mediaRecorderRef.current) {
        stopRecording();
        mediaRecorderRef.current = null;
      }
    });
  }, []);

  if (!state) return <h1>Carregando...</h1>;

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>
        🔴 {state.redScore} x {state.blueScore} 🔵
      </h1>

      <h2>Tempo: {state.timer}s</h2>

      <div>
        <h3>Faltas Vermelho</h3>
        {state.redFouls.map((f, i) => (
          <span key={i}>{f ? "🟨" : "⬜"}</span>
        ))}
      </div>

      <div>
        <h3>Faltas Azul</h3>
        {state.blueFouls.map((f, i) => (
          <span key={i}>{f ? "🟨" : "⬜"}</span>
        ))}
      </div>

      <h3>
        {state.recording ? "🎥 Gravando..." : "⏹️ Parado"}
      </h3>
    </div>
  );
}