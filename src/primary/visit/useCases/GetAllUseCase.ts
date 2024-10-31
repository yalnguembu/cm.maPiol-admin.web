import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import { VisitView } from "../VisitView";

export class GetAllUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(): Promise<VisitView[]> {
    const owners = await this.visitRepository.getAll();

    return owners.map(VisitView.fromDomain);
  }
}
