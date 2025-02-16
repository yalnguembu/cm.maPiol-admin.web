import { Conversation, Message } from "..";
import { ConversationToSave, MessageToSave } from "../types";

export interface ChatRepository {

  getMinesConversations(userId:string, role?: string): Promise<Conversation[]>;

  getConversationById(conversationId:string,): Promise<Conversation>;

  getAllMessagesByConversationId(conversationId:string): Promise<Message[]>;

  newConversation(data: ConversationToSave): Promise<string>;

  newMessage(data: MessageToSave): Promise<string>;

  uploadFiles(file: File): Promise<string>;
}