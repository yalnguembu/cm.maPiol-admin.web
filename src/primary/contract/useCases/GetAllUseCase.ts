import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { ContractView } from "../ContractView";
import {ContractStatusFilter} from "@/domains/contract/enum";

export class GetAllUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    filter?: ContractStatusFilter): Promise<ContractView[]> {
    const owners = await this.contractRepository.getAll(filter);

    return owners.map(ContractView.fromDomain);
  }
}
