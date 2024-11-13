import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { UserView } from "@/primary/user/UserView";

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<UserView> {
    const user = await this.userRepository.login(email, password);

    return UserView.fromDomain(user);
  }
}
