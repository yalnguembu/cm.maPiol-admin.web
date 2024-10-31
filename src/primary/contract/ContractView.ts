import { Contract } from "@/domains/contract";
import {  } from "@/domains/contract/types";
import { MoneyProperties } from "domains/types";

export class ContractView {
  private constructor(
    readonly id: string,
    readonly startDate: string,
    readonly endDate: string,
    readonly returnTimeDeposit: string,
    readonly amountDepositDuration: MoneyProperties,
    readonly preadviceDuration: string,
    readonly contractDuration: string,
    readonly frequency: string,
    readonly tenantId: string,
    readonly depositAmount: MoneyProperties,
    readonly amountByAmount: MoneyProperties,
    readonly amountPaid: MoneyProperties,
    readonly paymentMethod: string,
    readonly ownerId: string,
    readonly propertyId: string,
  ) {}

  static fromDomain(properties: Contract) {
    const {
      id,
      startDate,
      endDate,
      returnTimeDeposit,
      amountDepositDuration,
      preadviceDuration,
      contractDuration,
      frequency,
      tenantId,
      depositAmount,
      amountByAmount,
      amountPaid,
      paymentMethod,
      ownerId,
      propertyId,
    } = properties.properties;

    return new ContractView(
      id,
      startDate,
      endDate,
      returnTimeDeposit,
      amountDepositDuration,
      preadviceDuration,
      contractDuration,
      frequency,
      tenantId,
      depositAmount,
      amountByAmount,
      amountPaid,
      paymentMethod,
      ownerId,
      propertyId,
    );
  }
}
