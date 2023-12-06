import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../../stores/chatStore";
import EnterMessage from "../EnterMessage/EnterMessage";
import { useNavigate } from "react-router-dom";
import "./chatRoom.scss";
import Users from "../Users/Users";

const ChatRoom: React.FC = observer(() => {
  const store = useContext(ChatStoreContext);

  useEffect(() => {
    if (!store.currentNickname) {
      const navigate = useNavigate();
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
    <div className="chat">
      <Users />
      <EnterMessage />{" "}
      <button className="btn__reverse" onClick={sortMessages}>
        Sort messages
      </button>
    </div>
  );
});

export default ChatRoom;
