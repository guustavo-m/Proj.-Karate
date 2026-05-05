const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// estado da luta
let matchState = {
  redScore: 0,
  blueScore: 0,
  redFouls: [false, false, false, false, false],
  blueFouls: [false, false, false, false, false],
  timer: 0,
  running: false,
  recording: false
};

// conexão
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("state", matchState);

  socket.on("action", (action) => {
    handleAction(action);
    io.emit("state", matchState);
  });
});

// lógica das ações
function handleAction(action) {
  switch (action.type) {
    case "ADD_RED_POINT":
      matchState.redScore++;
      break;

    case "ADD_BLUE_POINT":
      matchState.blueScore++;
      break;

    case "REMOVE_RED_POINT":
      matchState.redScore = Math.max(0, matchState.redScore - 1);
      break;

    case "REMOVE_BLUE_POINT":
      matchState.blueScore = Math.max(0, matchState.blueScore - 1);
      break;

    case "ADD_RED_FAULT":
      addFault(matchState.redFouls);
      break;

    case "ADD_BLUE_FAULT":
      addFault(matchState.blueFouls);
      break;

    case "TOGGLE_TIMER":
      matchState.running = !matchState.running;
      break;

    case "TOGGLE_RECORDING":
      matchState.recording = !matchState.recording;
      break;
  }
}

function addFault(arr) {
  const index = arr.findIndex(f => !f);
  if (index !== -1) arr[index] = true;
}

// cronômetro
setInterval(() => {
  if (matchState.running) {
    matchState.timer++;
    io.emit("state", matchState);
  }
}, 1000);

// start server
server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});