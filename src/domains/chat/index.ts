import {  ConversationProperties, MessageProperties } from "./types";

export class Conversation {
  private constructor(
    private readonly id: string,
    private readonly clientId: string,
    private readonly ownerId: string,
    private readonly ownerName: string,
    private readonly propertyId: string,
    private readonly propertyName: string,
    private readonly propertyPicture: string,
    private readonly lastMessage: string,
    private readonly lastUpdated: string
  ) {}

  static fromProperties(properties: ConversationProperties) {
    const { id, propertyId, ownerId, clientId, lastMessage, lastUpdated, ownerName, propertyName, propertyPicture } =
      properties;
    return new Conversation(
      id,
      clientId,
      ownerId,
      ownerName,
      propertyId,
      propertyName,
      propertyPicture,
      lastMessage,
      lastUpdated
    );
  }

  get properties(): ConversationProperties {
    return {
      id: this.id,
      propertyId: this.propertyId,
      ownerId: this.ownerId,
      clientId: this.clientId,
      lastMessage: this.lastMessage,
      lastUpdated: this.lastUpdated,
      propertyName:this.propertyName,
      propertyPicture:this.propertyPicture,
      ownerName: this.ownerName,
    };
  }
}

export class Message {
  private constructor(
    private readonly id: string,
    private readonly senderId: string,
    private readonly text: string,
    private readonly timestamp: string,
    private readonly status: string,
    private readonly isImage: string,
    private readonly imageLink: string
  ) {}

  static fromProperties(properties: MessageProperties) {
    const { id, senderId, text, timestamp, status, isImage, imageLink } =
      properties;
    return new Message(
      id,
      senderId,
      text,
      timestamp,
      status,
      isImage,
      imageLink
    );
  }

  get properties(): MessageProperties {
    return {
      id: this.id,
      senderId: this.senderId,
      text: this.text,
      timestamp: this.id,
      status: this.id,
      isImage: this.id,
      imageLink: this.id,
    };
  }
}
