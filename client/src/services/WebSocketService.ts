import chatStore from "../stores/chatStore";

class WebSocketService {
  constructor() {
    console.log("create websocket");
  }
  socket: WebSocket | null = null;
  connected: boolean = false;

  connectWebSocket() {
    console.log("connectWebSocket");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log("Connected to the server");
      this.connected = true;
    };

    this.socket.onmessage = (message) => {
      if (message.data.includes("u have a new message:")) {
        const index = message.data.indexOf("{");
        const str = JSON.parse(message.data.slice(index));

        const indexForDate = str.timestamp.indexOf("G");
        const newDate = str.timestamp.slice(0, indexForDate);

        chatStore.messages.push({ text: str.text, timestamp: newDate, userName: str.userName });
        chatStore.messagesReverse.unshift({ text: str.text, timestamp: newDate, userName: str.userName });
      }
    };

    this.socket.onclose = () => {
      console.log("Connection closed");
      this.connected = false;
    };
  }

  disconect(): void {
    this.socket?.close();
  }

  sendNickname(nickname: string | null) {
    if (!nickname) {
      return;
    }
    console.log("sendNickname");
    if (this.connected && this.socket) {
      this.socket.send(JSON.stringify({ type: "login", nickname }));
    } else {
      console.log("Not connected to the server");
    }
  }

  sendMessage(data: { userName: string; text: string; timestamp: string }) {
    if (this.connected && this.socket) {
      this.socket.send(JSON.stringify({ type: "message", data: JSON.stringify(data) }));
    } else {
      console.log("Not connected to the server");
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
