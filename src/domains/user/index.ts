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
    private readonly adress: string,
    private readonly userType: UserType,
    private readonly uid: string,
    private readonly statut: number,
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
      adress = "",
      userType = 0,
      uid = "",
      statut = 0,
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
      adress,
      userType,
      uid,
      statut,
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
      adress: this.adress,
      userType: this.userType,
      uid: this.uid,
      statut: this.statut,
      idCardPicture: this.idCardPicture,
      idCardExpirationDate: this.idCardExpirationDate,
    };
  }
}
