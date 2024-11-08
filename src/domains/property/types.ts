import {MoneyProperties, addressProperties} from "domains/types";

export type PropertyId = string;
export type PropertyType = 0 | 1;

export type PropertyProperties = {
  id: string;
  centreImposition: string;
  description: string;
  price: MoneyProperties;
  state: number;
  hasAssensor: boolean;
  hasBalcony: boolean;
  hasCave: boolean;
  hasHealthCenterNearby: boolean;
  hasCollectiveHeating: boolean;
  hasPath: boolean;
  hasCollectiveHotWater: boolean;
  hasSchoolNearby: boolean;
  hasGreenSpace: boolean;
  hasGarage: boolean;
  hasSecurity: boolean;
  hasIntercom: boolean;
  hasDiningRoom: boolean;
  hasGrabageChute: boolean;
  favorite: string;
  frequence: string;
  numberOfBuilding: number;
  nombreEscalier: number;
  nombreEtage: number;
  nombrePieces: number;
  bathroomNumber: number;
  bedroomNumber: number;
  address: addressProperties;
  status: number;
  surface: number;
  type: PropertyType;
  usage: number;
  userId: string;
  images: string[];
  video: string;
  name: string;
};

export type PropertyToSave = Omit<PropertyProperties, "id" | "propertyType">;
