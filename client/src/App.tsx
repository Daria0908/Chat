import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterNickname from "./components/EnterNickname/EnterNickname";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import React, { useEffect } from "react";
import webSocketService from "./services/WebSocketService";

const App: React.FC = () => {
  useEffect(() => {
    webSocketService.connectWebSocket();

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
