import { UserId, UserProperties, UserType } from "./types";

export class User {
  private constructor(
    private readonly id: UserId,
    private readonly firstname: string,
    private readonly lastname: string,
    private readonly email: string,
    private readonly phoneNumber: string,
    private readonly idCardNumber: string,
    private readonly picture: string,
    private readonly address: string,
    private readonly userType: UserType,
    private readonly uid: string,
    private readonly status: number,
    private readonly idCardPicture: string,
    private readonly idCardExpirationDate: string
  ) {}

  static fromProperties(properties: UserProperties) {
    const {
      id = "",
      firstname = "",
      lastname = "",
      email = "",
      phoneNumber = "",
      idCardNumber = "",
      picture = "",
      address = "",
      userType = 0,
      uid = "",
      status = 0,
      idCardPicture = "",
      idCardExpirationDate = "",
    } = properties;

    return new User(
      id,
      firstname,
      lastname,
      email,
      phoneNumber,
      idCardNumber,
      picture,
      address,
      userType,
      uid,
      status,
      idCardPicture,
      idCardExpirationDate
    );
  }

  get properties(): UserProperties {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phoneNumber: this.phoneNumber,
      idCardNumber: this.idCardNumber,
      picture: this.picture,
      address: this.address,
      userType: this.userType,
      uid: this.uid,
      status: this.status,
      idCardPicture: this.idCardPicture,
      idCardExpirationDate: this.idCardExpirationDate,
    };
  }
}
