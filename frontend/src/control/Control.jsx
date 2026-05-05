import { useState } from "react";
import { socket } from "../socket";
import styles from "./Control.module.css";

export default function Control() {
  const send = (type) => socket.emit("action", { type });

  const [editingNames, setEditingNames] = useState(true);
  const [redName, setRedName] = useState("");
  const [blueName, setBlueName] = useState("");
  const [category, setCategory] = useState("");

if (editingNames) {
  return (
    <div className={styles.container}>
      <h2>Configurar Luta</h2>

      <input
        className={styles.input}
        placeholder="Competidor Vermelho"
        value={redName}
        onChange={(e) => setRedName(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Competidor Azul"
        value={blueName}
        onChange={(e) => setBlueName(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Categoria (ex: -84kg)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button
        className={`${styles.button} ${styles.green}`}
        onClick={() => {
          if (!redName || !blueName || !category) {
            alert("Preencha todos os campos!");
            return;
          }

          socket.emit("action", {
            type: "SET_NAMES",
            red: redName,
            blue: blueName,
            category: category
          });

          setEditingNames(false);
        }}
      >
        Iniciar Luta
      </button>
    </div>
  );
}

  const editTime = () => {
    const value = prompt("Tempo em segundos");
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

      {/* pontos */}
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

      {/* faltas */}
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

      {/* senshu */}
      <div className={styles.section}>
        <div className={styles.row}>
          <button className={`${styles.button} ${styles.green}`} onClick={() => send("TOGGLE_SENSHU_RED")}>Senshu 🔴</button>
          <button className={`${styles.button} ${styles.green}`} onClick={() => send("TOGGLE_SENSHU_BLUE")}>Senshu 🔵</button>
        </div>
      </div>

      {/* tempo */}
      <div className={styles.section}>
        <div className={styles.row}>
          <button className={`${styles.button} ${styles.green}`} onClick={() => send("TOGGLE_TIMER")}>Start / Stop</button>
        </div>

        <div className={styles.row}>
          <button className={`${styles.button} ${styles.gray}`} onClick={editTime}>Editar Tempo</button>
          <button className={`${styles.button} ${styles.gray}`} onClick={() => send("RESET_TIMER")}>Reset Tempo</button>
        </div>
      </div>

      {/* gravação */}
      <div className={styles.section}>
        <div className={styles.row}>
          <button className={`${styles.button} ${styles.gray}`} onClick={() => send("TOGGLE_RECORDING")}>🎥 Gravar</button>
        </div>
      </div>

      {/* fim */}
      <div className={styles.section}>
        <div className={styles.row}>
          <button
            className={`${styles.button} ${styles.red}`}
            onClick={() => {
              send("END_MATCH");
              setEditingNames(true);
            }}
          >
            Fim de Luta
          </button>
        </div>
      </div>
    </div>
  );
}