import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import { MessageToSave } from "@/domains/chat/types";

export class NewMessageUseCase {
  constructor(private readonly chatRepository: ChatRepository) {
  }

  async execute(form: MessageToSave): Promise<string> {
    return await this.chatRepository.newMessage(form);
  }
}
