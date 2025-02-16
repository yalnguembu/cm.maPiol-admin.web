import { PropertyType } from "domains/PropertyType";
import { Property } from "..";
import { PropertyToSave } from "../types";

export interface PropertyRepository {
  getPropertyById(id: string): unknown;
  getCommertialTypes(): unknown;
  editVideo(id: string, video: any): unknown;
  create(form: PropertyToSave): Promise<string>;

  getAll(): Promise<Property[]>;

  getMines(): Promise<Property[]>;

  getById(userId: string): Promise<Property>;

  update(userId: string, form: PropertyToSave): Promise<void>;

  getResidentialTypes(): Promise<PropertyType>;

  getCommercialTypes(): Promise<PropertyType>;
}