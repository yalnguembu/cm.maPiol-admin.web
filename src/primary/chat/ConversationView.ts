import { Conversation } from "@/domains/chat";

export class ConversationView {
  private constructor(
    readonly id: string,
    readonly clientId: string,
    readonly ownerId: string,
    readonly ownerName: string,
    readonly propertyId: string,
    readonly propertyName: string,
    readonly propertyPicture: string,
    readonly lastMessage: string,
    readonly lastUpdated: string
  ) {}

  static fromDomain(properties: Conversation) {
    const {
      id,
      clientId,
      ownerId,
      ownerName,
      propertyId,
      propertyName,
      propertyPicture,
      lastMessage,
      lastUpdated,
    } = properties.properties;
    return new ConversationView(
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
}
