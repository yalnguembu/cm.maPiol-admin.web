import { UserToSave } from "@/domains/user/types";
import {PropertyRepository} from "@/domains/property/repository/PropertyRepository";

export class UpdateUserUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string, form: UserToSave): Promise<void> {
    await this.propertyRepository.update(id, form);
  }
}
