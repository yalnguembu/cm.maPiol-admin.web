import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";

export class GetAllUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(): Promise<ContractView[]> {
    const owners = await this.contractRepository.getAll();

    return owners.map(ContractView.fromDomain);
  }
}
