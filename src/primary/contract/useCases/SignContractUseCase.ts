import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractToSave } from "@/domains/contract/types";

export class SignContractUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(contractId: string, role:"tenant"|"owner"): Promise<void> {
    await this.contractRepository.signContract(contractId, role);
  }
}
