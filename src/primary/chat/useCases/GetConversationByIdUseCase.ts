import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import {ConversationView} from "../ConversationView";

export class GetConversationByIdUseCase {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  async execute(conversationId: string): Promise<ConversationView> {
    const conversation = await this.chatRepository.getConversationById(conversationId);

    return ConversationView.fromDomain(conversation);
  }
}
