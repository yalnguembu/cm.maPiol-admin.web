import {ChatRepository} from "@/domains/chat/repository/ChatRepository";
import {
  GetAllMessagesByConversationId,
  GetConversationByIdUseCase,
  GetMinesConversationsUseCase,
  NewConversationUseCase,
  NewMessageUseCase
} from "./useCases";
import { ConversationToSave, MessageToSave } from "@/domains/chat/types";

export class ChatService {
  private getAllMessagesByConversationIdUseCase: GetAllMessagesByConversationId;
  private getConversationByIdUseCase: GetConversationByIdUseCase;
  private getMinesConversationsUseCase: GetMinesConversationsUseCase;
  private newConversationUseCase: NewConversationUseCase;
  private newMessageUseCase: NewMessageUseCase;

  constructor(chatRepository: ChatRepository) {
    this.getAllMessagesByConversationIdUseCase = new GetAllMessagesByConversationId(chatRepository);
    this.getConversationByIdUseCase = new GetConversationByIdUseCase(chatRepository);
    this.getMinesConversationsUseCase = new GetMinesConversationsUseCase(chatRepository);
    this.newConversationUseCase = new NewConversationUseCase(chatRepository);
    this.newMessageUseCase = new NewMessageUseCase(chatRepository);
  }

  async getAllMessagesByConversationId(id: string) {
    return await this.getAllMessagesByConversationIdUseCase.execute(id);
  }

  async newConversation(form:ConversationToSave) {
    return await this.newConversationUseCase.execute(form);
  }

  async getMinesConversations(userId: string, role?:string) {
    return await this.getMinesConversationsUseCase.execute(userId,role);
  }

  async getConversationById(id: string) {
    return await this.getConversationByIdUseCase.execute(id);
  }

  async newMessage(form:MessageToSave) {
    return await this.newMessageUseCase.execute(form);
  }
}
