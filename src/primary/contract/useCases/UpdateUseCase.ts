import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractToSave } from "@/domains/contract/types";

export class UpdateContractUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(id: string, form: ContractToSave): Promise<void> {
    await this.contractRepository.updateContract(id, form);
  }
}
