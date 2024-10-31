import { Visit } from "@/domains/visit";
import { ApiVisit, VisitFetched } from "./ApiVisit";
import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import { FirebaseClient } from "@/secondary/FirebaseClient";
import { VisitToSave } from "domains/visit/types";

export class VisitRessource implements VisitRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {}

  async getAll(): Promise<Visit[]> {
    const apiVisits = await this.firebaseClient.getAllDocuments<VisitFetched[]>(
      {
        collection: "AgendaVisites",
      }
    );
    return apiVisits.map(ApiVisit.toDomain);
  }

  async getMines(userId: string): Promise<Visit[]> {
    const apiVisits = await this.firebaseClient.getDataByCondition<
      VisitFetched[]
    >({
      collection: "AgendaVisites",
      field: "proprietaireId",
      operator: "==",
      value: userId,
    });
    return apiVisits.map(ApiVisit.toDomain);
  }

  async getById(visitId: string): Promise<Visit> {
    const visit = await this.firebaseClient.getDocumentByName<VisitFetched>({
      collection: "AgendaVisites",
      documentName: visitId,
    });
    return ApiVisit.toDomain(visit);
  }

  async cancel(visitId: string): Promise<string> {
    const visitCreatedId = await this.firebaseClient.addDocument({
      collection: "AgendaVisites",
      documentName: visitId,
      form: { statut: 1 },
    });
    return visitCreatedId;
  }

  async accept(visitId: string): Promise<void> {
    await this.firebaseClient.updateDocument({
      collection: "AgendaVisites",
      documentName: visitId,
      form: { statut: 2 },
    });
  }

  async create(form: VisitToSave): Promise<string> {
    return await this.firebaseClient.addDocument({
      collection: "AgendaVisites",
      form: ApiVisit.fromProperties(form),
    });
  }
}
