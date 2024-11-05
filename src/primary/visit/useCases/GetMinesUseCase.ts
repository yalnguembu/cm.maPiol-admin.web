import {VisitRepository} from "domains/visit/repository/VisitRepository";
import {VisitView} from "../VisitView";

export class GetMinesUseCase {
  constructor(private readonly visitRepository: VisitRepository) {
  }

  async execute(userId: string, role: "owner" | "tenant"): Promise<VisitView[]> {
    const owners = await this.visitRepository.getMines(userId, role);

    return owners.map(VisitView.fromDomain);
  }
}
