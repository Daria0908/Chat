import { makeAutoObservable } from "mobx";
import { IMessage } from "../models/Message";
import { IChatStore } from "../models/ChatStore";

class ChatStore implements IChatStore {
  constructor() {
    makeAutoObservable(this);
  }

  messages: IMessage[] = [];
  messagesIsReverse: boolean = false;

  currentNickname: string = "";

  setNickname(nickname: string): void {
    this.currentNickname = nickname;
  }

  setMessages(data: IMessage[]): void {
    this.messages = data;
    localStorage.setItem("messages", JSON.stringify([...this.messages]));
  }

  toggleIsReverse(): void {
    this.messagesIsReverse = !this.messagesIsReverse;
    this.messages = this.messages.reverse();
  }

  addMessage(m: IMessage): void {
    this.messages.push(m);
    localStorage.setItem("messages", JSON.stringify([...this.messages]));
  }

  getMessagesFromLocalStorage(): void {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      this.setMessages(parsedMessages);
    }
  }
}

export const chatStore = new ChatStore();
export default chatStore;
