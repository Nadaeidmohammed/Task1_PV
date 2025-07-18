import express from "express";
import dotenv from "dotenv";
import { bootstrab } from "./src/app.controller.js";
import { runSocket } from "./src/Modules/WebSocket/index.js";
import http from "http"; 

dotenv.config({ path: "./src/config/.env" });

const app = express();
await bootstrab(app, express);

const server = http.createServer(app);

runSocket(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});
