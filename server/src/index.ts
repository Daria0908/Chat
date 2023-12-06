import express from "express";
import http from "http";
import WebSocket from "ws";
import { Server } from "http";
import { IUser } from "./models/User";
import { v4 } from "uuid";
import { IMessageToClient } from "./models/MessageToClient";
import { IMessageFromClient } from "./models/MessageFromClient";

const app = express();
const server: Server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users: IUser[] = [];
const mesages: IMessageFromClient[] = [];

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: any) => {
    const data = JSON.parse(message);
    let messageToClient: IMessageToClient | null = null;
    let messageFromClient: IMessageFromClient | null = null;
    switch (data.type) {
      case "login":
        const currentUser: IUser = {
          id: v4(),
          nickname: data.nickname,
        };
        if (!users.some((user: IUser) => user.nickname === currentUser.nickname)) {
          users.push(currentUser);
        }
        break;

      case "message":
        const model = JSON.parse(data.data);
        messageFromClient = {
          text: model.text,
          userName: model.userName,
          timestamp: new Date(),
        };
        mesages.push(messageFromClient);

        messageToClient = {
          text: messageFromClient.text,
          userName: messageFromClient.userName,
          timestamp: messageFromClient.timestamp.toString(),
        };

        const message = JSON.stringify(messageToClient);
        const m = `u have a new message: ${message}`;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(m);
          }
        });

        break;

      default:
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
