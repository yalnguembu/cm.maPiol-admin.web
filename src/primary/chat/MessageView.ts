import { Message } from "@/domains/chat";

export class MessageView {
  private constructor(
    readonly id: string,
    readonly senderId :string,
    readonly text :string,
    readonly timestamp :string,
    readonly status :string,
    readonly isImage :string,
    readonly imageLink :string,
  ) {}

  static fromDomain(properties: Message) {
    const {
      id,
      senderId,
      text,
      timestamp,
      status,
      isImage,
      imageLink,
    } = properties.properties;
    return new MessageView(
      id,
      senderId,
      text,
      timestamp,
      status,
      isImage,
      imageLink,
    );
  }
}
