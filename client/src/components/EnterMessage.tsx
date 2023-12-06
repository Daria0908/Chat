import React, { useState, useEffect, useContext } from "react";
import webSocketService from "../services/WebSocketService";
import { ChatStoreContext, IChatStore } from "../stores/chatStore";
import { observer } from "mobx-react-lite";
import { IMessage } from "../models/Message";

const EnterMessage: React.FC = observer(() => {
  const [message, setMessage] = useState<string>("");
  const store: IChatStore = useContext(ChatStoreContext);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (message.trim() !== "") {
      webSocketService.sendMessage({ text: message, userName: store.currentNickname, timestamp: "" });
      setMessage("");
    }
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") handleSendMessage(event);
  };

  return (
    <div>
      <input value={message} onKeyDown={handleEnter} onChange={(e) => setMessage(e.target.value)} placeholder="enter your message" />
      <button onClick={handleSendMessage}>Enter message</button>
    </div>
  );
});

export default EnterMessage;
