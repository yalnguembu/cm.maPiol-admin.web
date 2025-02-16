import { Conversation, Message } from "@/domains/chat";
import {
  ConversationProperties,
  MessageProperties,
} from "@/domains/chat/types";

export type ConversationFetched = {
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

export type MessageFetched = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: string;
  isImage: string;
  imageLink: string;
};

export class ApiConveration {
  static toDomain(apiConversation: ConversationFetched): Conversation {
    return Conversation.fromProperties(apiConversation);
  }

  static fromProperties(
    conversation: ConversationProperties
  ): Omit<ConversationFetched, "id"> {
    return {
      propertyId: conversation.propertyId,
      propertyName: conversation.propertyName,
      propertyPicture: conversation.propertyPicture,
      ownerId: conversation.ownerId,
      ownerName: conversation.ownerName,
      clientId: conversation.clientId,
      lastMessage: conversation.lastMessage,
      lastUpdated: conversation.lastUpdated,
    };
  }
}

export class ApiMessage {
  static toDomain(apiMessage: MessageFetched): Message {
    return Message.fromProperties(apiMessage);
  }

  static fromProperties(
    message: MessageProperties
  ): Omit<MessageFetched, "id"> {
    return {
      senderId: message.senderId,
      text: message.text,
      timestamp: message.timestamp,
      status: message.status,
      isImage: message.isImage,
      imageLink: message.imageLink,
    };
  }
}
