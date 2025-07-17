export type Match = {
  id: number;
  senderId: string;
  receiverId: string;
  createdAt: string;
  isMatched: boolean;
};

export type Chat = {
  id: number;
  senderId: string;
  receiverId: string;
  productId?: number;
  isExchange: boolean;
  createdAt: string;
};

export type Message = {
  id: number;
  chatId: number;
  senderId: string;
  content: string;
  createdAt: string;
};
