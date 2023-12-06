import { IMessage } from "./Message";

export interface IChatStore {
  messages: IMessage[];
  messagesIsReverse: boolean;
  currentNickname: string;
  setNickname: (n: string) => void;
  setMessages: (data: IMessage[]) => void;
  toggleIsReverse: () => void;
  addMessage: (m: IMessage) => void;
  getMessagesFromLocalStorage: () => void;
}
