import React, { useState, useContext } from "react";
import webSocketService from "../../services/WebSocketService";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../../stores/chatStore";
import { useNavigate } from "react-router-dom";
import { IChatStore } from "../../models/ChatStore";
import "./enterNickname.scss";

const EnterNickname: React.FC = observer(() => {
  const navigate = useNavigate();

  const store: IChatStore = useContext(ChatStoreContext);
  const [nickname, setNickname] = useState<string>("");

  const handleSendNickname = (e: any) => {
    e?.preventDefault();

    if (nickname.trim() !== "") {
      store.setNickname(nickname);
      webSocketService.sendNickname(store.currentNickname);
      navigate("/chat-room");
    }
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") handleSendNickname(event);
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
