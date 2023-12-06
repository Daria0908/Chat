import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../stores/chatStore";
import EnterMessage from "./EnterMessage";
import { useNavigate } from "react-router-dom";

const ChatRoom: React.FC = observer(() => {
  const store = useContext(ChatStoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.currentNickname) {
      navigate("/");
    }
  }, []);

  if (!store.messagesIsReverse) {
    store.currentMessages = store.messages;
  } else {
    store.currentMessages = store.messagesReverse;
  }

  const sortMessages = (event: any) => {
    store.messagesIsReverse ? (store.messagesIsReverse = false) : (store.messagesIsReverse = true);
  };

  return (
    <div>
      <div>
        {store.currentMessages.map((message, index) => (
          <div key={index}>
            <h2>{message.userName}</h2>
            <p>{message.timestamp}</p>
            <p>{message.text}</p>
          </div>
        ))}
        <button onClick={sortMessages}>reverse messages</button>
      </div>
      <EnterMessage />
    </div>
  );
});

export default ChatRoom;
