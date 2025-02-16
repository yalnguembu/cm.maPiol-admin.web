import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import {ConversationView} from "../ConversationView";
import { ConversationToSave } from "@/domains/chat/types";

export class NewConversationUseCase {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  async execute(form: ConversationToSave): Promise<string> {
    return  await this.chatRepository.newConversation(form);
  }
}
