import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterNickname from "./components/EnterNickname/EnterNickname";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import React, { useEffect, useContext } from "react";
import webSocketService from "./services/WebSocketService";
import { IChatStore } from "./models/ChatStore";
import chatStore from "./stores/chatStore";

const App: React.FC = () => {
  useEffect(() => {
    webSocketService.connectWebSocket();
    chatStore.getMessagesFromLocalStorage();
    return () => {
      webSocketService.disconect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterNickname />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
