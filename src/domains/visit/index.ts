import { VisitProperties } from "./types";


export class Visit {
  private constructor(
    private readonly id: string,
    private readonly date: string,
    private readonly time: string,
    private readonly tenantId: string,
    private readonly ownerId: string,
    private readonly propertyId: string,
    private readonly status: string,
    private readonly details: string,
  ) {}

  static fromProperties(properties: VisitProperties) {
    const {
      id,
      date,
      time,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    } = properties;

    return new Visit(
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

  get properties(): VisitProperties {
    return {
      id: this.id,
      date: this.date,
      time: this.time,
      tenantId: this.tenantId,
      ownerId: this.ownerId,
      propertyId: this.propertyId,
      details: this.details,
      status: this.status,
    };
  }
}
