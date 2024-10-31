import { Contract } from "@/domains/contract";

export class VisitView {
  private constructor(
    readonly id: string,
    readonly date: string,
    readonly time: string,
    readonly tenantId: string,
    readonly ownerId: string,
    readonly propertyId: string,
    readonly status: string,
    readonly details: string,
  ) {}

  static fromDomain(properties: Contract) {
    const {
      id,
      date,
      time,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    } = properties.properties;

    return new VisitView(
      id,
      date,
      time,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    );
  }
}
