import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import { VisitView } from "../VisitView";

export class GetAllUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(): Promise<VisitView[]> {
    const visits = await this.visitRepository.getAll();

    return visits.map(VisitView.fromDomain);
  }
}
