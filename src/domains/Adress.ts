import { AdressProperties, PositionProperties } from "./types";

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

export class Adress {
  constructor(private readonly adress: AdressProperties) {}

  get country(): string {
    return this.adress.country ?? "";
  }

  set country(country: string) {
    this.adress.country = country ?? "";
  }

  get city(): string {
    return this.adress.city ?? "";
  }

  set city(city: string) {
    this.adress.city = city ?? "";
  }

  get street(): string {
    return this.adress.street ?? "";
  }

  set street(street: string) {
    this.adress.street = street ?? "";
  }

  get fullAdress(): string {
    return `${this.country && this.country + ","} ${
      this.city && this.city + ","
    } ${this.street && this.street + ","}`;
  }

  get position(): Position {
    return new Position(this.adress.position);
  }

  set position(position: PositionProperties) {
    this.adress.position.latitude = position.latitude ?? 0;
    this.adress.position.longitude = position.longitude ?? 0;
  }
}
