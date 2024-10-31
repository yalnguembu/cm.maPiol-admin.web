import { Contract } from "..";
import { ContractToSave } from "../types";

export interface ContractRepository {
  create(form: ContractToSave): Promise<string>;

  getAll(): Promise<Contract[]>;

  getMines(id: string, userType: "owner" | "tenant"): Promise<Contract[]>;

  getById(userId: string): Promise<Contract>;

  update(userId: string, form: ContractToSave): Promise<void>;
}
