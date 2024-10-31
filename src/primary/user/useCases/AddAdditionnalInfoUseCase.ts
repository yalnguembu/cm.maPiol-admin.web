import { UserRepository } from "@/domains/user/repository/UserRepository";
import { AddAdditionnalInfos } from "@/domains/user/types";

export class AddAdditionnalInfosUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, form: AddAdditionnalInfos) {
    return await this.userRepository.addAdditionnalInfos(userId, form);
  }
}
