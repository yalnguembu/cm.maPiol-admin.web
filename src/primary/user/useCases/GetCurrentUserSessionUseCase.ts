import { UserRepository } from "../../../domains/user/repository/UserRepository";
import { UserView } from "../UserView";

export class GetCurrentUserSessionUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): UserView | null {
    const user = this.userRepository.getCurrentUserSession();
    if (user) return UserView.fromDomain(user);
    return null;
  }
}
