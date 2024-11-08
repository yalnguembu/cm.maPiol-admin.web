import { ContractProperties } from "./types";

import {  MoneyProperties } from "../types";
import { Money } from "@/domains/Money";

export class Contract {
  private constructor(
    private readonly id: string,
    private readonly startDate: string,
    private readonly endDate: string,
    private readonly paymentDate: string,
    private readonly returnTimeDeposit: string,
    private readonly amountDepositDuration: MoneyProperties,
    private readonly preadviceDuration: string,
    private readonly contractDuration: string,
    private readonly frequency: string,
    private readonly tenantId: string,
    private readonly depositAmount: MoneyProperties,
    private readonly amountByAmount: MoneyProperties,
    private readonly amountPaid: MoneyProperties,
    private readonly paymentMethod: string,
    private readonly ownerId: string,
    private readonly propertyId: string,
    private readonly approvedByOwner: boolean,
    private readonly approvedByTenant: boolean,
  ) {}

  static fromProperties(properties: ContractProperties) {
    const {
      id,
      startDate,
      endDate,
      paymentDate,
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
      approvedByOwner,
      approvedByTenant,
    } = properties;

    return new Contract(
      id,
      startDate,
      endDate,
      paymentDate,
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
      approvedByOwner,
      approvedByTenant,
    );
  }

  get properties(): ContractProperties {
    return {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      paymentDate: this.paymentDate,
      returnTimeDeposit: this.returnTimeDeposit,
      amountDepositDuration: new Money( this.amountDepositDuration),
      preadviceDuration: this.preadviceDuration,
      contractDuration: this.contractDuration,
      frequency: this.frequency,
      tenantId: this.tenantId,
      depositAmount: new Money( this.depositAmount),
      amountByAmount: new Money(  this.amountByAmount),
      amountPaid:  new Money( this.amountPaid),
      paymentMethod: this.paymentMethod,
      ownerId: this.ownerId,
      propertyId: this.propertyId,
      approvedByOwner: this.approvedByOwner,
      approvedByTenant: this.approvedByTenant,
    };
  }
}
