import { IMessage } from "./Message";

export interface IChatStore {
  messages: IMessage[];
  messagesReverse: IMessage[];
  currentMessages: IMessage[];
  messagesIsReverse: boolean;
  currentNickname: string;
  setNickname: (n: string) => void;
}
