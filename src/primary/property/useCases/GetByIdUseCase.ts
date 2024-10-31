import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyView } from "../PropertyView";

export class GetByIdUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string): Promise<PropertyView> {
    const property = await this.propertyRepository.getById(id);

    return PropertyView.fromDomain(property);
  }
}
