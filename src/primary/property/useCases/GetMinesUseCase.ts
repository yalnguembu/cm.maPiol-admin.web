import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyView } from "../PropertyView";

export class GetMinesUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(propertyId: string): Promise<PropertyView[]> {
    const owners = await this.propertyRepository.getMines(propertyId);

    return owners.map(PropertyView.fromDomain);
  }
}
