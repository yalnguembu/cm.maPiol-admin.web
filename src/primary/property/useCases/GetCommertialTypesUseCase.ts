import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyType } from "@/domains/PropertyType";

export class GetCommertialTypesUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<PropertyType[]> {
    const propertyTypes = await this.propertyRepository.getCommertialTypes();

    return propertyTypes.map((propertyType) => new PropertyType(propertyType));
  }
}
