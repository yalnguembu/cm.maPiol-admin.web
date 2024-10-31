export type VisitId = string;

export type VisitProperties = {
  id: string;
  tenantId: string;
  ownerId: string;
  propertyId: string;
  details: string;
  date: string;
  time: string;
  status: number;
};

export type VisitToSave = Omit<VisitProperties, "id">;
