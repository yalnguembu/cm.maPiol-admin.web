import { UserRepository } from "@/domains/user/repository/UserRepository";
import { UserView } from "@/primary/user/UserView";

export class GetVisitorsUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserView[]> {
    const owners = await this.userRepository.getAllVisitors();

    return owners.map(UserView.fromDomain);
  }
}
