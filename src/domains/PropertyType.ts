export class PropertyType {
  constructor(
    private readonly propertyType: {
      name: string;
      id: string;
    }
  ){};

  get id() :string {
    return this.propertyType.id ?? "";
  }

  get name() :string {
    return this.propertyType.name ?? "";
  }
}
