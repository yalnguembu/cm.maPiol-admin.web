import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";

export class GetByIdUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(id: string): Promise<ContractView> {
    const contract = await this.contractRepository.getById(id);

    return ContractView.fromDomain(contract);
  }
}
