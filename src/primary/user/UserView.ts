import { User } from "@/domains/user";
import { UserId, UserType } from "@/domains/user/types";

export class UserView {
  private constructor(
    readonly id: UserId,
    readonly firstname: string,
    readonly lastname: string,
    readonly email: string,
    readonly phoneNumber: string,
    readonly idCardNumber: string,
    readonly picture: string,
    readonly adress: string,
    readonly userType: UserType,
    readonly statut: number,
  ) {}

  static fromDomain(properties: User) {
    const {
      id,
      firstname,
      lastname,
      email,
      phoneNumber,
      idCardNumber,
      picture,
      adress,
      userType,
      statut,
    } = properties.properties;

    return new UserView(
      id,
      firstname,
      lastname,
      email,
      phoneNumber,
      idCardNumber,
      picture,
      adress,
      userType,
      statut
    );
  }

  get role() {
    switch (this.userType) {
      case 0:
        return "VISITOR";
      case 1:
        return "TENANT";
      case 2:
        return "OWNER";
      case 3:
        return "ADMIN";
      case 4:
        return "CONTROLLER";
      default:
        return "VISITOR";
    }
  }

  get fullName(): string {
    return `${this.lastname} ${this.firstname}`;
  }
}
