import { MoneyProperties, CURRENCY } from "./types";

export   class Money {
    constructor(private readonly money: MoneyProperties) {}
  
    get currency(): CURRENCY {
      return this.money.currency ?? "XAF";
    }
  
    set currency(currency: CURRENCY) {
      this.money.currency = currency ?? "XAF";
    }
  
    get value(): number {
      return this.money.value ?? 0;
    }
  
    set value(value: number) {
      this.money.value = value ?? 0;
    }
  }
    