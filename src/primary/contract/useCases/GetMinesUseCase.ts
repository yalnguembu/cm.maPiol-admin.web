import {ContractRepository} from "domains/notification/repository/ContractRepository";
import {ContractView} from "../ContractView";
import {ContractStatusFilter} from "@/domains/contract/enum";

export class GetMinesUseCase {
  constructor(private readonly contractRepository: ContractRepository) {
  }

  async execute(
    contractId: string,
    userType: "owner" | "tenant",
    filter?: ContractStatusFilter
  ): Promise<ContractView[]> {
    const owners = await this.contractRepository.getMines(contractId, userType, filter);

    return owners.map(ContractView.fromDomain);
  }
}
