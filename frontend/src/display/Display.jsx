import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import styles from "./Display.module.css";

export default function Display() {
  const [state, setState] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const prevTimer = useRef(null);

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

  function playBeep() {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play();
  }

  function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    socket.on("state", (data) => {

      // som ao zerar
      if (
        data.isCountdown &&
        data.timer === 0 &&
        prevTimer.current !== 0
      ) {
        playBeep();
      }

      prevTimer.current = data.timer;

      // gravação
      if (data.recording && !mediaRecorderRef.current) {
        startRecording();
      }

      if (!data.recording && mediaRecorderRef.current) {
        stopRecording();
        mediaRecorderRef.current = null;
      }

      setState(data);
    });
  }, []);

  if (!state) return <h1>Carregando...</h1>;

  const isEnding = state.isCountdown && state.timer <= 10;

 return (
  <div className={styles.container}>
    
    {/* TOPO */}
    <div className={styles.top}>
      <div className={styles.varBox}>VAR</div>
    </div>

    {/* PLACAR */}
    <div className={styles.scoreboard}>
      
      {/* VERMELHO */}
      <div className={`${styles.side} ${styles.red}`}>
        <div className={styles.name}>{state.redName}</div>

        <div className={styles.score}>{state.redScore}</div>

        <div className={styles.warning}>WARNING</div>

        <div className={styles.fouls}>
          {state.redFouls.map((f, i) => (
            <div key={i} className={f ? styles.foulActive : styles.foul}>
              {f ? i + 1 : ""}
            </div>
          ))}
        </div>
      </div>

      {/* CENTRO */}
      <div className={styles.center}>
        <div className={`${styles.timer} ${isEnding ? styles.ending : ""}`}>
          {formatTime(state.timer)}
        </div>
      </div>

      {/* AZUL */}
      <div className={`${styles.side} ${styles.blue}`}>
        <div className={styles.name}>{state.blueName}</div>

        <div className={styles.score}>{state.blueScore}</div>

        <div className={styles.warning}>WARNING</div>

        <div className={styles.fouls}>
          {state.blueFouls.map((f, i) => (
            <div key={i} className={f ? styles.foulActive : styles.foul}>
              {f ? i + 1 : ""}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RODAPÉ */}
    <div className={styles.footer}>
      <span>Categoria: -84kg</span>
      <span>Dojo Tomodati</span>
    </div>
  </div>
);
}