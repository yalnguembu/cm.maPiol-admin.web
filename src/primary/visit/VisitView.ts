import { Contract } from "@/domains/contract";
import {VisitDate} from "@/domains/visit/VisitDate";
import {Visit} from "@/domains/visit";

export class VisitView {
  private constructor(
    readonly id: string,
    readonly dates: VisitDate,
    readonly tenantId: string,
    readonly ownerId: string,
    readonly propertyId: string,
    readonly details: string,
    readonly status: string,
  ) {}

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
