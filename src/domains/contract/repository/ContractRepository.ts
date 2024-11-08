import {Contract} from "..";
import {ContractToSave} from "../types";
import {Payment} from "@/domains/contract/Payment";
import {ContractStatusFilter} from "@/domains/contract/enum";

export interface ContractRepository {
  create(form: ContractToSave): Promise<string>;

  getAll(filter?: ContractStatusFilter): Promise<Contract[]>;

  getMines(id: string, userType: "owner" | "tenant", filter?: ContractStatusFilter): Promise<Contract[]>;

  getById(userId: string): Promise<Contract>;

  update(userId: string, form: ContractToSave): Promise<void>;

  sign(contractId: string, userType: "owner" | "tenant"): Promise<string>;

  addPayment(payment: Payment): Promise<string>;

  getPayments(contractId: string): Promise<Payment[]>;
}
