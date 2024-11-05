import {VisitProperties} from "./types";
import {VisitDate, VisitDateProperties} from "./VisitDate";


export class Visit {
  private constructor(
    private readonly id: string,
    private readonly _dates: VisitDateProperties[],
    private readonly tenantId: string,
    private readonly ownerId: string,
    private readonly propertyId: string,
    private readonly details: string,
    private readonly status: number,
  ) {
  }

  static fromProperties(properties: VisitProperties) {
    const {
      id,
      dates,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    } = properties;
    return new Visit(
      id,
      dates,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    );
  }

  get dates(): VisitDate[] {
    return this._dates?.map((date) => new VisitDate(date));
  }

  get properties(): VisitProperties {
    return {
      id: this.id,
      dates: this._dates,
      tenantId: this.tenantId,
      ownerId: this.ownerId,
      propertyId: this.propertyId,
      details: this.details,
      status: this.status,
    };
  }
}
