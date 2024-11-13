import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import { VisitView } from "../../visit/VisitView";

export class GetByIdUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(id: string): Promise<VisitView> {
    const visit = await this.visitRepository.getById(id);

    return VisitView.fromDomain(visit);
  }
}
