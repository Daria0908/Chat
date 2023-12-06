import React, { useState, useEffect, useContext } from "react";
import webSocketService from "../services/WebSocketService";
import { observer } from "mobx-react-lite";
import { ChatStoreContext, IChatStore } from "../stores/chatStore";
import { useNavigate } from "react-router-dom";

const EnterNickname: React.FC = observer(() => {
  const navigate = useNavigate();

  const store: IChatStore = useContext(ChatStoreContext);
  const [nickname, setNickname] = useState<string>("");

  // useEffect(() => {
  //   webSocketService.connectWebSocket();
  // }, []);

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
      <input value={nickname} onKeyDown={handleEnter} onChange={(e) => setNickname(e.target.value)} />
      <button onClick={handleSendNickname} type="button">
        Join to chat
      </button>
    </div>
  );
});

export default EnterNickname;
