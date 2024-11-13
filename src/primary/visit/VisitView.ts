import {VisitDate} from "@/domains/visit/VisitDate";
import {Visit} from "@/domains/visit";

export class VisitView {
  private constructor(
    readonly id: string,
    private  readonly _dates: VisitDate,
    readonly tenantId: string,
    readonly ownerId: string,
    readonly propertyId: string,
    readonly details: string,
    readonly status: string,
  ) {}

  get dates(): VisitDate[] {
    return this._dates?.map((date) => new VisitDate(date));
  }

  static fromDomain(properties: Visit) {
    const {
      id,
      dates,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    } = properties.properties;
    return new VisitView(
      id,
      dates,
      tenantId,
      ownerId,
      propertyId,
      details,
      status,
    );
  }
}
