import {VisitDateProperties} from "./VisitDate";

export type VisitId = string;

export type VisitProperties = {
  id: string;
  tenantId: string;
  ownerId: string;
  propertyId: string;
  details: string;
  dates: VisitDateProperties[];
  status: number;
};

export type VisitToSave = Omit<VisitProperties, "id">;
