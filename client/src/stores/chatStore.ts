import { makeAutoObservable } from "mobx";
import { IMessage } from "../models/Message";
import { createContext } from "react";

class ChatStore implements IChatStore {
  constructor() {
    makeAutoObservable(this);
  }
  messages: IMessage[] = [];
  currentNickname: string = "";

  addMessage(message: IMessage): void {
    this.messages.push(message);
  }

  setNickname(nickname: string): void {
    this.currentNickname = nickname;
  }
}

export interface IChatStore {
  messages: IMessage[];
  currentNickname: string;
  addMessage: (m: IMessage) => void;
  setNickname: (n: string) => void;
}

export const chatStore = new ChatStore();
export const ChatStoreContext = createContext(chatStore);
export default chatStore;
