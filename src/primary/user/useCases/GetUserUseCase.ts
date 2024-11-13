import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { UserView } from "@/primary/user/UserView";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserView> {
    const user = await this.userRepository.getUser(id);

    return UserView.fromDomain(user);
  }
}
