import { socket } from "../socket";

export default function Control() {
  const send = (type) => {
    socket.emit("action", { type });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Controle</h1>

      <button onClick={() => send("ADD_RED_POINT")}>+ Vermelho</button>
      <button onClick={() => send("REMOVE_RED_POINT")}>- Vermelho</button>

      <button onClick={() => send("ADD_BLUE_POINT")}>+ Azul</button>
      <button onClick={() => send("REMOVE_BLUE_POINT")}>- Azul</button>

      <hr />

      <button onClick={() => send("ADD_RED_FAULT")}>Falta Vermelho</button>
      <button onClick={() => send("ADD_BLUE_FAULT")}>Falta Azul</button>

      <hr />

      <button onClick={() => send("TOGGLE_TIMER")}>Start/Stop</button>

      <button onClick={() => send("TOGGLE_RECORDING")}>
        Gravar
      </button>
    </div>
  );
}