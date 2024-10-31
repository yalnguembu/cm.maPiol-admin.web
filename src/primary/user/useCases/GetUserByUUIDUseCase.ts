import { UserRepository } from "@/domains/user/repository/UserRepository";
import { UserView } from "@/primary/user/UserView";

export class GetUserByUUIDUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserView> {
    const user = await this.userRepository.getUserByUUID(id);

    return UserView.fromDomain(user);
  }
}
