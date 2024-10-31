import { UserRepository } from "@/domains/user/repository/UserRepository";
import { UserView } from "@/primary/user/UserView";

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<UserView> {
    const user = await this.userRepository.login(email, password);

    return UserView.fromDomain(user);
  }
}
