import {MoneyProperties} from "../types";
import {Money} from "../Money";

export type PaymentProperties = {
  id?: string;
  amount: MoneyProperties;
  month?: string;
  year?: string;
  contractId?: string;
  initialisationDate?: string;
}

export class Payment {
  constructor(private readonly payment: PaymentProperties) {
  }

  get id(): string {
    return this.payment.id ?? "";
  }

  get amount(): Money {
    return new Money(this.payment.amount);
  }

  set amount(amount: MoneyProperties) {
    this.payment.amount = amount;
  }

  get year(): string {
    return this.payment.year ?? "";
  }

  set year(year: string) {
    this.payment.year = year;
  }

  get month(): string {
    return this.payment.month ?? "";
  }

  set month(month: string) {
    this.payment.month = month;
  }

  get contractId(): string {
    return this.payment.contractId ?? ""
  }

  set contractId(contractId: string) {
    this.payment.contractId = contractId;
  }

  get properties(): PaymentProperties {
    return this.payment;
  }

  get initialisationDate(): string {
    return this.payment.initialisationDate ?? ""
  }

}