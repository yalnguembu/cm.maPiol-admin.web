import {MoneyProperties} from "../types";
import {Money} from "../Money";

export type PaymentProperties = {
  id?: string;
  amount: MoneyProperties;
  month?: string;
  year?: string;
  contractId?: string;
  initialisationDate?: string;
  period?: string;
  paymentMethod?: string;
  paymentType?: string;
  description?: string;
  unit?: string;
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

  get period(): string {
    return this.payment.period ?? "";
  }

  set period(period: string) {
    this.payment.period = period;
  }

  get contractId(): string {
    return this.payment.contractId ?? ""
  }

  set contractId(contractId: string) {
    this.payment.contractId = contractId;
  }

  get paymentType(): string {
    return this.payment.paymentType ?? ""
  }

  get paymentMethod(): string {
    return this.payment.paymentMethod ?? ""
  }

  get unit(): string {
    return this.payment.unit ?? ""
  }
  get description(): string {
    return this.payment.description ?? ""
  }

  get properties(): PaymentProperties {
    return this.payment;
  }

  get initialisationDate(): string {
    return this.payment.initialisationDate ?? ""
  }

}