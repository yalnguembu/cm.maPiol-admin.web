import { Conversation, Message } from "@/domains/chat";
import { ApiConveration, ApiMessage } from "./ApiChat";
import { ChatRepository } from "@/domains/chat/repository/ChatRepository";
import { FirebaseClient } from "@/secondary/FirebaseClient";
import { ConversationProperties, ConversationToSave, MessageProperties, MessageToSave } from "@/domains/chat/types";

type ClientType = "client" | "owner" | "tenant"

export class ChatRessource implements ChatRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {}

  async getConversationById(conversationId: string): Promise<Conversation> {
    const conversation =
      await this.firebaseClient.getDocumentByName<ConversationProperties>({
        collection: "Conversations",
        documentName: conversationId,
      });
    return ApiConveration.toDomain(conversation) ;
  }

  async getAllMessagesByConversationId(
    conversationId: string
  ): Promise<Message[]> {
    const messages = await this.firebaseClient.getDataByCondition<MessageProperties[]>({
      collection: "Messages",
      field: "conversationId",
      operator: "==",
      value: conversationId,
    });
    return messages.map((message)=> ApiMessage.toDomain(message));
  }

  async getMinesConversations(userId: string, role:ClientType="client"): Promise<Conversation[]> {
    const conversations = await this.firebaseClient.getDataByCondition<
    ConversationProperties[]
    >({
      collection: "Conversations",
      field: role === "client" ? "clientId" : "ownerId",
      operator: "==",
      value: userId,
    });
    return conversations.map((conversation) => ApiConveration.toDomain(conversation));
  }

  async newConversation(data: ConversationToSave): Promise<string> {
    console.log(data);
    
    return await this.firebaseClient.addDocument({
      collection: "Conversations",
      form: data,
    });
  }

  async newMessage(data: MessageToSave): Promise<string> {
    return await this.firebaseClient.addDocument({
      collection: "Messages",
      form: data,
    });
  }

  async uploadFiles(file: File): Promise<string> {
    const fileUrl = await this.firebaseClient.saveImage(file);
    return fileUrl;
  }
}
