import { VisitRepository } from "domains/visit/repository/VisitRepository";
import { VisitView } from "../VisitView";

export class GetMinesUseCase {
  constructor(private readonly visitRepository: VisitRepository) {}

  async execute(userId: string): Promise<VisitView[]> {
    const owners = await this.visitRepository.getMines(userId);

    return owners.map(VisitView.fromDomain);
  }
}
