import { ContractRepository } from "@/domains/contract/repository/ContractRepository";
import { Payment } from "@/domains/contract/types";

export class CreatePaymentUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(form: Payment): Promise<string> {
    return await this.contractRepository.addPayment(form);
  }
}
