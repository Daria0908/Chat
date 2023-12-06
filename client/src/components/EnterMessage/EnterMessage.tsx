import React, { useState, useContext } from "react";
import webSocketService from "../../services/WebSocketService";
import { ChatStoreContext } from "../../stores/chatStore";
import { observer } from "mobx-react-lite";
import "./enterMessage.scss";
import { IChatStore } from "../../models/ChatStore";

const EnterMessage: React.FC = observer(() => {
  const [message, setMessage] = useState<string>("");
  const store: IChatStore = useContext(ChatStoreContext);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (message.trim() !== "") {
      const currentMessage = { text: message, userName: store.currentNickname, timestamp: "" };
      webSocketService.sendMessage(currentMessage);

      setMessage("");
    }
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") handleSendMessage(event);
  };

  return (
    <div className="message">
      <input
        className="input__message"
        value={message}
        onKeyDown={handleEnter}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="enter your message"
      />
      <button className="btn__enter-Message" onClick={handleSendMessage}>
        Send Message
      </button>
    </div>
  );
});

export default EnterMessage;
