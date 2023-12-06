import { makeAutoObservable } from "mobx";
import { IMessage } from "../models/Message";
import { createContext } from "react";
import { IChatStore } from "../models/ChatStore";

class ChatStore implements IChatStore {
  constructor() {
    makeAutoObservable(this);
  }
  messages: IMessage[] = [];
  messagesReverse: IMessage[] = [];
  currentMessages: IMessage[] = [];

  messagesIsReverse: boolean = false;

  currentNickname: string = "";

  setNickname(nickname: string): void {
    this.currentNickname = nickname;
  }
}

export const chatStore = new ChatStore();
export const ChatStoreContext = createContext(chatStore);
export default chatStore;
