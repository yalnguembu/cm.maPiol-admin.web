import { VisitRepository } from "@/domains/visit/repository/VisitRepository";

export class AcceptUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(id: string, index: number): Promise<void> {
    await this.visitRepository.accept(id, index);
  }
}
