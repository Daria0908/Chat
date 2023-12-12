import React, { useEffect, useContext, SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import EnterMessage from "../EnterMessage/EnterMessage";
import { useNavigate } from "react-router-dom";
import "./chatRoom.scss";
import Messages from "../Messages/Messages";
import chatStore from "../../stores/chatStore";
const ChatRoom: React.FC = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!chatStore.currentNickname) {
      navigate("/");
    }
  }, []);

  const sortMessages = (e: SyntheticEvent) => {
    e.preventDefault();
    chatStore.toggleIsReverse();
  };

  return (
    <div className="chat">
      <Messages />
      <EnterMessage />
      <button type="button" className="btn__reverse" onClick={sortMessages}>
        Sort messages
      </button>
    </div>
  );
});

export default ChatRoom;
