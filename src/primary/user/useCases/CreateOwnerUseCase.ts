import { UserRepository } from "@/domains/user/repository/UserRepository";
import {  UserToSave } from "@/domains/user/types";

export class CreateOwnerUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(form: UserToSave): Promise<void> {
    return await this.userRepository.createOwner(form);
  }
}
