import React, { useState, useContext, SyntheticEvent } from "react";
import webSocketService from "../../services/WebSocketService";
import { ChatStoreContext } from "../../stores/chatStore";
import { observer } from "mobx-react-lite";
import "./enterMessage.scss";
import { IChatStore } from "../../models/ChatStore";
import sengMessageImg from "../../assets/sendMessage.png";

const EnterMessage: React.FC = observer(() => {
  const [message, setMessage] = useState<string>("");
  const store: IChatStore = useContext(ChatStoreContext);

  const handleSendMessage = (e: SyntheticEvent) => {
    e.preventDefault();

    if (message.trim() !== "") {
      const currentMessage = { text: message, userName: store.currentNickname, timestamp: "" };
      webSocketService.sendMessage(currentMessage);

      setMessage("");
    }
  };

  return (
    <div className="input__message">
      <textarea
        className="textarea__message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="enter your message"
        maxLength={300}
      />
      <img src={sengMessageImg} className="btn__enter-Message" onClick={handleSendMessage} />
    </div>
  );
});

export default EnterMessage;
