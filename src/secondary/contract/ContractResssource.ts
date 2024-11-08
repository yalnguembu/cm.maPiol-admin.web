import {Contract} from "@/domains/contract";
import {ApiContract, ApiPayment, ApiPaymentProperties, ContractFetched} from "./ApiContract";
import {ContractRepository} from "@/domains/contract/repository/ContractRepository";
import {ContractToSave} from "@/domains/contract/types";
import {FirebaseClient} from "@/secondary/FirebaseClient";
import {Payment} from "@/domains/contract/Payment";
import {ContractStatusFilter} from "@/domains/contract/enum";

export class ContractRessource implements ContractRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {
  }

  async getAll(filter?: ContractStatusFilter): Promise<Contract[]> {
    const apiContracts = await this.firebaseClient.getAllDocuments<
      ContractFetched[]
    >({
      collection: "Contrats",
    });
    return apiContracts.map(ApiContract.toDomain);
  }

  async getMines(
    userId: string,
    userType: "owner" | "tenant",
    filter?: ContractStatusFilter
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
      form: ApiContract.fromProperties({...form}),
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

  async getPayments(contractId: string): Promise<Payment[]> {
    const apiContracts = await this.firebaseClient.getDataByCondition<
      ApiPaymentProperties[]
    >({
      collection: "Payments",
      field: "contratId",
      operator: "==",
      value: contractId
    });
    return apiContracts.map(ApiPayment.toDomain);
  }

  async addPayment(form: Payment): Promise<string> {
    return await this.firebaseClient.addDocument({
      collection: "Payments",
      form: ApiPayment.fromDomain({...form.properties}),
    });
  }

  async signContract(contractId: string, role: "tenant" | "owner"): Promise<void> {
    console.log(contractId, role)
    const form = (role === "tenant" ? ({"approuveParLocatire": true}) : ({"approuveParProprietaire": true}))
    await this.firebaseClient.updateDocument({
      documentName: contractId,
      collection: "Contrats",
      form,
    });
  }
}
