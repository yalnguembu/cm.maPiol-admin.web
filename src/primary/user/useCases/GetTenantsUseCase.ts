import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { UserView } from "@/primary/user/UserView";

export class GetTenantsUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserView[]> {
    const owners = await this.userRepository.getAllTenants();

    return owners.map(UserView.fromDomain);
  }
}
