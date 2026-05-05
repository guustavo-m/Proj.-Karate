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

  redName: "",
  blueName: "",

  timer: 120,
  duration: 120,
  isCountdown: true,
  running: false,

  recording: false
};

io.on("connection", (socket) => {
  socket.emit("state", matchState);

  socket.on("action", (action) => {
    handleAction(action);
    io.emit("state", matchState);
  });
});

function handleAction(action) {
  switch (action.type) {

    // pontos
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

    // faltas
    case "ADD_RED_FAULT":
      addFault(matchState.redFouls);
      break;

    case "ADD_BLUE_FAULT":
      addFault(matchState.blueFouls);
      break;

    case "REMOVE_RED_FAULT":
      removeFault(matchState.redFouls);
      break;

    case "REMOVE_BLUE_FAULT":
      removeFault(matchState.blueFouls);
      break;

    // tempo
    case "TOGGLE_TIMER":
      matchState.running = !matchState.running;
      break;

    case "SET_TIME":
      matchState.timer = action.value;
      matchState.duration = action.value;
      break;

    // nomes
    case "SET_NAMES":
      matchState.redName = action.red;
      matchState.blueName = action.blue;
      break;

    // gravação
    case "TOGGLE_RECORDING":
      matchState.recording = !matchState.recording;
      break;
  }
}

// funções auxiliares
function addFault(arr) {
  const index = arr.findIndex(f => !f);
  if (index !== -1) arr[index] = true;
}

function removeFault(arr) {
  const index = arr.slice().reverse().findIndex(f => f);
  if (index !== -1) {
    arr[arr.length - 1 - index] = false;
  }
}

// cronômetro
setInterval(() => {
  if (matchState.running) {
    if (matchState.isCountdown) {
      if (matchState.timer > 0) {
        matchState.timer--;
      } else {
        matchState.running = false;
      }
    } else {
      matchState.timer++;
    }

    io.emit("state", matchState);
  }
}, 1000);

server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});