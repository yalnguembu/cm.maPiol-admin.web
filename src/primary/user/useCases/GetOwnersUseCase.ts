import { UserRepository } from "@/domains/user/repository/UserRepository";
import { UserView } from "@/primary/user/UserView";

export class GetOwnersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserView[]> {
    const owners = await this.userRepository.getAllOwners();

    return owners.map(UserView.fromDomain);
  }
}
