export type PositionProperties = {
    latitude: number;
    longitude: number;
  };

export type addressProperties = {
  country?: string;
  city?: string;
  street?: string;
  quater: string;
  position?: PositionProperties;
};

export type CURRENCY = "XAF" | "USD";

export type MoneyProperties = {
  currency: CURRENCY;
  value: number;
};
