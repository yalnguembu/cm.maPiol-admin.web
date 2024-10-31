import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractToSave } from "@/domains/contract/types";

export class CreateUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(form: ContractToSave): Promise<void> {
    await this.contractRepository.create(form);
  }
}
