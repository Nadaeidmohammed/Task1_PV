import { WebSocketServer } from "ws";

let wssInstance = null;

export const runSocket = (server) => {
  const wss = new WebSocketServer({ server });
  wssInstance = wss;

 wss.on("connection", (ws) => {
  console.log(" WebSocket client connected");

  ws.on("message", (msg) => {
    console.log(" Client says:", msg);
  });

  ws.on("close", () => {
    console.log(" WebSocket client disconnected");
  });
});

};

export const getWSS = () => wssInstance;
