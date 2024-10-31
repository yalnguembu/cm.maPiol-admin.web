import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyView } from "../PropertyView";

export class GetAllUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<PropertyView[]> {
    const owners = await this.propertyRepository.getAll();

    return owners.map(PropertyView.fromDomain);
  }
}
