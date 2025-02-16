import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import {MessageView} from "../MessageView";

export class GetAllMessagesByConversationId {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  async execute(conversationId: string): Promise<MessageView[]> {
    let messages = await this.chatRepository.getAllMessagesByConversationId(conversationId);
    return messages.map(MessageView.fromDomain);
  }
}
