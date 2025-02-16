import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import {ConversationView} from "../ConversationView";

export class GetMinesConversationsUseCase {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  async execute(conversationId: string, role?:string): Promise<ConversationView[]> {
    const owners = await this.chatRepository.getMinesConversations(conversationId,role);

    return owners.map(ConversationView.fromDomain);
  }
}
