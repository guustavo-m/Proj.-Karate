import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import styles from "./Display.module.css";

export default function Display() {
  const [state, setState] = useState(null);
  const prevTimer = useRef(null);

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
      if (data.timer === 0 && prevTimer.current !== 0) {
        playBeep();
      }
      prevTimer.current = data.timer;
      setState(data);
    });
  }, []);

  if (!state) return <h1>Carregando...</h1>;

  const isEnding = state.timer <= 10;

  return (
    <div className={styles.container}>
      <div className={styles.scoreboard}>
        
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
            {state.senshu === "red" && (
            <div className={styles.senshu}>SENSHU</div>
            )}
        </div>

        <div className={styles.center}>
          <div className={`${styles.timer} ${isEnding ? styles.ending : ""}`}>
            {formatTime(state.timer)}
          </div>
        </div>

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
            {state.senshu === "blue" && (
            <div className={styles.senshu}>SENSHU</div>
            )}
        </div>
      </div>
      <div className={styles.footer}>
        <div>Categoria: {state.category}</div>
        <div>Dojo Tomodati</div>
      </div>
    </div>
  );
}