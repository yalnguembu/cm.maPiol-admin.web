import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { UserToSave } from "@/domains/user/types";

export class CreateAdminUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(form: UserToSave): Promise<void> {
    await this.userRepository.createAdmin(form);
  }
}
