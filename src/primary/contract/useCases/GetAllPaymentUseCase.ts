import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";

export class GetAllPaymentUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(): Promise<ContractView[]> {
    const owners = await this.contractRepository.getAllPayments();

    return owners.map(ContractView.fromDomain);
  }
}
