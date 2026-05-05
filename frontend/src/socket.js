import { io } from "socket.io-client";

// TROQUE PELO SEU IP PARA USAR NO CELULAR
export const socket = io("http://localhost:3001");