import { UserRepository } from "@/domains/notification/repository/NotificationRepository";
import { AddAdditionalInfos } from "@/domains/user/types";

export class AdditionalInfosUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, form: AddAdditionalInfos) {
    return await this.userRepository.addAdditionalInfos(userId, form);
  }
}
