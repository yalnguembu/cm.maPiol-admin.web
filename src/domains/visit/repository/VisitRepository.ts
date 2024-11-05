import { Visit } from "..";

export interface VisitRepository {

  getAll(): Promise<Visit[]>;

  getMines(id:string, role?: "owner"| "tenant"): Promise<Visit[]>;

  cancel(userId: string): Promise<void>;

  accept(userId: string): Promise<void>;
}