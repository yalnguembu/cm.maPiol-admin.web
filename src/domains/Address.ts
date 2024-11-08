import { addressProperties, PositionProperties } from "./types";

class Position {
  constructor(private readonly position: PositionProperties) {}

  get latitude(): number {
    return this.position.latitude ?? 0.0;
  }

  set latitude(latitude: number) {
    this.position.latitude = latitude ?? 0.0;
  }

  get longitude(): number {
    return this.position.longitude ?? 0.0;
  }

  set longitude(longitude: number) {
    this.position.latitude = longitude ?? 0.0;
  }
}

export class address {
  constructor(private readonly address: addressProperties) {}

  get country(): string {
    return this.address.country ?? "";
  }

  set country(country: string) {
    this.address.country = country ?? "";
  }

  get city(): string {
    return this.address.city ?? "";
  }

  set city(city: string) {
    this.address.city = city ?? "";
  }

  get street(): string {
    return this.address.street ?? "";
  }

  set street(street: string) {
    this.address.street = street ?? "";
  }

  get fulladdress(): string {
    return `${this.country && this.country + ","} ${
      this.city && this.city + ","
    } ${this.street && this.street + ","}`;
  }

  get position(): Position {
    return new Position(this.address.position);
  }

  set position(position: PositionProperties) {
    this.address.position.latitude = position.latitude ?? 0;
    this.address.position.longitude = position.longitude ?? 0;
  }
}
