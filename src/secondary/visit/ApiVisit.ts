import {Visit} from "@/domains/visit";
import {VisitProperties} from "@/domains/visit/types";

type Dates = {
  dateVisite: string;
  heureVisite: string;
  status: number;
}
export type VisitFetched = {
  id: string;
  dates: Dates[];
  propietaireId: string;
  proprieteID: string;
  status: string;
  userId: string;
  autreDetails: string;
};

export class ApiVisit {
  static toDomain(apiVisit: VisitFetched): Visit {
    return Visit.fromProperties({
      id: apiVisit.id ?? "",
      dates: apiVisit.dates?.map((dateItem) => ({
        date: dateItem.dateVisite,
        hour: dateItem.heureVisite,
        status: dateItem.status
      })) ?? [],
      details: apiVisit.autreDetails ?? "",
      tenantId: apiVisit.userId ?? "",
      ownerId: apiVisit.propietaireId ?? "",
      propertyId: apiVisit.proprieteID ?? "",
      status: apiVisit.status ?? 0,
    });
  }

  static fromProperties(visit: VisitProperties): Omit<VisitFetched, "id"> {
    return {
      autreDetails: visit.details,
      dateVisite: visit.date,
      heureVisite: visit.time,
      propietaireId: visit.ownerId,
      propieteId: visit.propertyId,
      status: visit.status,
      userId: visit.tenantId,
    };
  }
}
