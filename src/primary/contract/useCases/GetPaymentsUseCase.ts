import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";

export class GetPaymentsUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(contractId: string): Promise<ContractView[]> {
    return await this.contractRepository.getPayments(contractId);
  }
}
