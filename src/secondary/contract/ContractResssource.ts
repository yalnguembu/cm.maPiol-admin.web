import { Contract } from "@/domains/contract";
import { ApiContract, ContractFetched } from "./ApiContract";
import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractToSave } from "@/domains/contract/types";
import { FirebaseClient } from "@/secondary/FirebaseClient";

export class ContractRessource implements ContractRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {}

  async getAll(): Promise<Contract[]> {
    const apiContracts = await this.firebaseClient.getAllDocuments<
      ContractFetched[]
    >({
      collection: "Contrats",
    });
    return apiContracts.map(ApiContract.toDomain);
  }

  async getMines(
    userId: string,
    userType: "owner" | "tenant"
  ): Promise<Contract[]> {
    const apiContracts = await (userType === "owner"
      ? this.firebaseClient.getDataByCondition<ContractFetched[]>({
          collection: "Contrats",
          field: "proprietaireId",
          operator: "==",
          value: userId,
        })
      : this.firebaseClient.getDataByCondition<ContractFetched[]>({
          collection: "Contrats",
          field: "locataireId",
          operator: "==",
          value: userId,
        }));
    return apiContracts.map(ApiContract.toDomain);
  }

  async getById(contractId: string): Promise<Contract> {
    const contract =
      await this.firebaseClient.getDocumentByName<ContractFetched>({
        collection: "Contrats",
        documentName: contractId,
      });
    return ApiContract.toDomain(contract);
  }

  async create(form: ContractToSave): Promise<string> {
    const contractCreatedId = await this.firebaseClient.addDocument({
      collection: "Contrats",
      form: ApiContract.fromProperties({ ...form }),
    });
    return contractCreatedId;
  }

  async update(contractId: string, form: ContractToSave): Promise<void> {
    await this.firebaseClient.updateDocument({
      collection: "Contrats",
      documentName: contractId,
      form,
    });
  }

  async getPayments(): Promise<Contract[]> {
    const apiContracts = await this.firebaseClient.getAllDocuments<
      ContractFetched[]
    >({
      collection: "Contrats",
    });
    return apiContracts.map(ApiContract.toDomain);
  }

  async addPayment(form: ContractToSave): Promise<string> {
    const contractCreatedId = await this.firebaseClient.addDocument({
      collection: "Contrats",
      form: ApiContract.fromProperties({ ...form }),
    });
    return contractCreatedId;
  }
}
