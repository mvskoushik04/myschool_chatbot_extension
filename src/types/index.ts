export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isMinimized: boolean;
  isVisible: boolean;
}
