import {ContractRepository} from "@/domains/contract/repository/ContractRepository";
import {
  CreateUseCase,
  GetByIdUseCase,
  GetAllUseCase,
  GetMinesUseCase,
  UpdateContractUseCase, SignContractUseCase, GetPaymentsUseCase, CreatePaymentUseCase,
} from "./useCases";
import {ContractId, ContractToSave} from "domains/notification/types";
import {Payment} from "@/domains/contract/Payment";
import {ContractStatusFilter} from "@/domains/contract/enum";

export class ContractService {
  private getByIdUseCase: GetByIdUseCase;
  private createUseCase: CreateUseCase;
  private getMinesUseCase: GetMinesUseCase;
  private getAllUseCase: GetAllUseCase;
  private updateUseCase: UpdateContractUseCase;
  private signContractUseCase: SignContractUseCase;
  private getPaymentsUseCase: GetPaymentsUseCase;
  private createPaymentUseCase: CreatePaymentUseCase;

  constructor(contractRepository: ContractRepository) {
    this.getByIdUseCase = new GetByIdUseCase(contractRepository);
    this.createUseCase = new CreateUseCase(contractRepository);
    this.getMinesUseCase = new GetMinesUseCase(contractRepository);
    this.getAllUseCase = new GetAllUseCase(contractRepository);
    this.updateUseCase = new UpdateContractUseCase(contractRepository);
    this.signContractUseCase = new SignContractUseCase(contractRepository);
    this.getPaymentsUseCase = new GetPaymentsUseCase(contractRepository);
    this.createPaymentUseCase = new CreatePaymentUseCase(contractRepository);
  }

  async getById(id: string) {
    return await this.getByIdUseCase.execute(id);
  }

  async getAll(filter?: ContractStatusFilter) {
    return await this.getAllUseCase.execute(filter);
  }

  async getMines(id: string, userType: "owner" | "tenant" = "owner", filter?: ContractStatusFilter) {
    return await this.getMinesUseCase.execute(id, userType, filter);
  }

  async createContract(contract: ContractToSave) {
    return await this.createUseCase.execute(contract);
  }

  async updateContract(contractId: ContractId, form: ContractToSave) {
    return await this.updateUseCase.execute(contractId, form);
  }

  async signContract(contractId: string, role: "owner" | "tenant") {
    return await this.signContractUseCase.execute(contractId, role);
  }

  async getPayments(contractId: string): Promise<Payment[]> {
    return await this.getPaymentsUseCase.execute(contractId);
  }

  async addPayment(payment: Payment): Promise<string> {
    return await this.createPaymentUseCase.execute(payment);
  }
}
