import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import { VisitToSave } from "domains/visit/types";

export class CreateUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(form: VisitToSave): Promise<void> {
    await this.visitRepository.create(form);
  }
}
