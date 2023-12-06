import { makeAutoObservable } from "mobx";
import { IMessage } from "../models/Message";
import { createContext } from "react";

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

export interface IChatStore {
  messages: IMessage[];
  messagesReverse: IMessage[];
  currentMessages: IMessage[];
  messagesIsReverse: boolean;
  currentNickname: string;
  setNickname: (n: string) => void;
}

export const chatStore = new ChatStore();
export const ChatStoreContext = createContext(chatStore);
export default chatStore;
