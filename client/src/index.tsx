import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import chatStore from "./stores/chatStore";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider chatStore={chatStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
