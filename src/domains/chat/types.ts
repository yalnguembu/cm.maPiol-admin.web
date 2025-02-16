
export type ChatId = string;

export type ConversationProperties = {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyPicture: string;
  ownerId: string;
  ownerName: string;
  clientId: string;
  lastMessage: string;
  lastUpdated: string;
};

export type MessageProperties = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: string;
  isImage: string;
  imageLink: string;
};
export type ConversationToSave = Omit<ConversationProperties, "id">;

export type MessageToSave = Omit<MessageProperties, "id">;
