import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import {
  CreateUseCase,
  GetByIdUseCase,
  GetAllUseCase,
  GetMinesUseCase,
  UpdateContractUseCase,
} from "./useCases";
import { ContractId, ContractToSave } from "domains/contract/types";

export class ContractService {
  private getByIdUseCase: GetByIdUseCase;
  private createUseCase: CreateUseCase;
  private getMinesUseCase: GetMinesUseCase;
  private getAllUseCase: GetAllUseCase;
  private updateUseCase: UpdateContractUseCase;

  constructor(propertyRepository: ContractRepository) {
    this.getByIdUseCase = new GetByIdUseCase(propertyRepository);
    this.createUseCase = new CreateUseCase(propertyRepository);
    this.getMinesUseCase = new GetMinesUseCase(propertyRepository);
    this.getAllUseCase = new GetAllUseCase(propertyRepository);
    this.updateUseCase = new UpdateContractUseCase(propertyRepository);
  }

  async getById(id: string) {
    return await this.getByIdUseCase.execute(id);
  }

  async getAll() {
    return await this.getAllUseCase.execute();
  }

  async getMines(id: string, userType: "owner" | "tenant" = "owner") {
    return await this.getMinesUseCase.execute(id, userType);
  }

  async createContract(property: ContractToSave) {
    return await this.createUseCase.execute(property);
  }

  async updateContract(propertyId: ContractId, form: ContractToSave) {
    return await this.updateUseCase.execute(propertyId, form);
  }
}
