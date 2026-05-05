import { useState } from "react";
import { socket } from "../socket";
import styles from "./Control.module.css";

export default function Control() {
  const send = (type) => {
    socket.emit("action", { type });
  };

  // tela de nomes
  const [editingNames, setEditingNames] = useState(true);
  const [redName, setRedName] = useState("");
  const [blueName, setBlueName] = useState("");

  if (editingNames) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Inserir Competidores</h2>

        <input
          placeholder="Vermelho"
          value={redName}
          onChange={(e) => setRedName(e.target.value)}
        />

        <input
          placeholder="Azul"
          value={blueName}
          onChange={(e) => setBlueName(e.target.value)}
        />

        <button
          onClick={() => {
            socket.emit("action", {
              type: "SET_NAMES",
              red: redName,
              blue: blueName
            });
            setEditingNames(false);
          }}
        >
          Confirmar
        </button>
      </div>
    );
  }

  const editTime = () => {
    const value = prompt("Tempo em segundos (ex: 120)");
    if (value) {
      socket.emit("action", {
        type: "SET_TIME",
        value: Number(value)
      });
    }
  };

return (
  <div className={styles.container}>
    <h1 className={styles.title}>Controle</h1>

    {/* PONTOS */}
    <div className={styles.section}>
      <div className={styles.row}>
        <button className={`${styles.button} ${styles.red}`} onClick={() => send("ADD_RED_POINT")}>+ 🔴</button>
        <button className={`${styles.button} ${styles.red}`} onClick={() => send("REMOVE_RED_POINT")}>- 🔴</button>
      </div>

      <div className={styles.row}>
        <button className={`${styles.button} ${styles.blue}`} onClick={() => send("ADD_BLUE_POINT")}>+ 🔵</button>
        <button className={`${styles.button} ${styles.blue}`} onClick={() => send("REMOVE_BLUE_POINT")}>- 🔵</button>
      </div>
    </div>

    {/* FALTAS */}
    <div className={styles.section}>
      <div className={styles.row}>
        <button className={`${styles.button} ${styles.yellow}`} onClick={() => send("ADD_RED_FAULT")}>+ Falta 🔴</button>
        <button className={`${styles.button} ${styles.yellow}`} onClick={() => send("REMOVE_RED_FAULT")}>- Falta 🔴</button>
      </div>

      <div className={styles.row}>
        <button className={`${styles.button} ${styles.yellow}`} onClick={() => send("ADD_BLUE_FAULT")}>+ Falta 🔵</button>
        <button className={`${styles.button} ${styles.yellow}`} onClick={() => send("REMOVE_BLUE_FAULT")}>- Falta 🔵</button>
      </div>
    </div>

    {/* TEMPO */}
    <div className={styles.section}>
      <div className={styles.row}>
        <button className={`${styles.button} ${styles.green}`} onClick={() => send("TOGGLE_TIMER")}>
          Start / Stop
        </button>
      </div>

      <div className={styles.row}>
        <button className={`${styles.button} ${styles.gray}`} onClick={editTime}>
          Editar Tempo
        </button>
      </div>
    </div>

    {/* GRAVAÇÃO */}
    <div className={styles.section}>
      <div className={styles.row}>
        <button className={`${styles.button} ${styles.gray}`} onClick={() => send("TOGGLE_RECORDING")}>
          🎥 Gravar
        </button>
      </div>
    </div>
  </div>
);
}