import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../../stores/chatStore";
import EnterMessage from "../EnterMessage/EnterMessage";
import { useNavigate } from "react-router-dom";
import "./chatRoom.scss";
import Messages from "../Messages/Messages";
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
    <div className="chat">
      <Messages />
      <EnterMessage />{" "}
      <button className="btn__reverse" onClick={sortMessages}>
        Sort messages
      </button>
    </div>
  );
});

export default ChatRoom;
