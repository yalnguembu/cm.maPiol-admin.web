import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { UserToSave } from "@/domains/user/types";

export class EditVideoUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, form: UserToSave): Promise<void> {
    await this.userRepository.editVideo(id, form);
  }
}
