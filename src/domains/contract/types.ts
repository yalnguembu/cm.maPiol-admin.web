import { MoneyProperties } from "domains/types";

export type ContractId = string;
export type ContractType = 0 | 1;

export type ContractProperties = {
  id: string;
  startDate: string;
  endDate: string;
  returnTimeDeposit: string;
  amountDepositDuration: MoneyProperties;
  preadviceDuration: string;
  contractDuration: string;
  frequency: string;
  tenantId: string;
  depositAmount: MoneyProperties;
  amountByAmount: MoneyProperties;
  amountPaid: MoneyProperties;
  paymentMethod: string;
  ownerId: string;
  propertyId: string;
  paymentDate: string;
};

export type ContractToSave = Omit<ContractProperties, "id">;
