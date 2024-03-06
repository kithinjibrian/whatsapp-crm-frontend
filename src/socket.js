import { io } from "socket.io-client";

export const socket = io("http://34.27.241.186", {
  path: "/bleh/socket.io",
});
