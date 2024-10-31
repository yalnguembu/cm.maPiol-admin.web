import { ContractRepository } from "domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";

export class GetMinesUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    userType: "owner" | "tenant"
  ): Promise<ContractView[]> {
    const owners = await this.contractRepository.getMines(contractId, userType);

    return owners.map(ContractView.fromDomain);
  }
}
