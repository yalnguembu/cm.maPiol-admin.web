import { VisitRepository } from "@/domains/visit/repository/VisitRepository";

export class CancelUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(id: string): Promise<void> {
    await this.visitRepository.cancel(id);
  }
}

