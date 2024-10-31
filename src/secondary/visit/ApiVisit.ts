import { Visit } from "@/domains/visit";
import { VisitProperties } from "@/domains/visit/types";

export type VisitFetched = {
  id: string;
  dateVisite: string;
  heureVisite: string;
  propietaireId: string;
  propieteId: string;
  statut: string;
  userId: string;
  autreDetails: string;
};

export class ApiVisit {
  static toDomain(apiVisit: VisitFetched): Visit {
    return Visit.fromProperties({
      id: apiVisit.id ?? "",
      date: apiVisit.dateVisite ?? "",
      time: apiVisit.heureVisite ?? "",
      details: apiVisit.autreDetails ?? "",
      tenantId: apiVisit.userId ?? "",
      ownerId: apiVisit.propietaireId ?? "",
      propertyId: apiVisit.propitteId ?? "",
      status: apiVisit.statut ?? 0,
    });
  }
  static fromProperties(visit: VisitProperties): Omit<VisitFetched, "id"> {
    return {
      autreDetails: visit.details,
      dateVisite: visit.date,
      heureVisite: visit.time,
      propietaireId: visit.ownerId,
      propieteId: visit.propertyId,
      statut: visit.status,
      userId: visit.tenantId,
    };
  }
}
