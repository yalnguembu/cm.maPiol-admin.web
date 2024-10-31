import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyToSave } from "@/domains/property/types";

export class CreateUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(form: PropertyToSave, images: File[]): Promise<void> {
    await this.propertyRepository.create(form, images);
  }
}
