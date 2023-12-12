import React, { useState, useContext, SyntheticEvent } from "react";
import webSocketService from "../../services/WebSocketService";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { IChatStore } from "../../models/ChatStore";
import "./enterNickname.scss";
import chatStore from "../../stores/chatStore";

const EnterNickname: React.FC = observer(() => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  const handleSendNickname = (e: SyntheticEvent) => {
    e?.preventDefault();

    if (nickname.trim() !== "") {
      chatStore.setNickname(nickname);
      webSocketService.sendNickname(chatStore.currentNickname);
      navigate("/chat-room");
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") handleSendNickname(e);
  };

  return (
    <div>
      <h1>Enter Nickname</h1>
      <input className="input__nickname" value={nickname} onKeyDown={handleEnter} onChange={(e) => setNickname(e.target.value)} />
      <button className="btn__enter-nickname" onClick={handleSendNickname} type="button">
        Join to chat
      </button>
    </div>
  );
});

export default EnterNickname;
