import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sistema de Placar</h1>
      <p className={styles.subtitle}>
        Sistema de placar em tempo real
      </p>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.control}`}
          onClick={() => navigate("/control")}
        >
          📱 Controlar
        </button>

        <button
          className={`${styles.button} ${styles.display}`}
          onClick={() => navigate("/display")}
        >
          🖥️ Display
        </button>
      </div>
    </div>
  );
}