import { User } from "@/domains/user";
import { UserType } from "@/domains/user/types";

export type UserFetched = {
  addresse: string;
  id: string;
  cniNumber: string;
  email: string;
  nom: string;
  prenom: string;
  photoProfil: string;
  profileImage: string;
  telephone: string;
  typeUsersId: number;
  uid: string;
  statut: number;
  CNIDateDelivrer: string;
  photoCNI: string;
};

export class ApiUser {
  static toDomain(apiUser: UserFetched): User {
    return User.fromProperties({
      id: apiUser.id ?? "",
      firstname: apiUser.nom ?? "",
      lastname: apiUser.prenom ?? "",
      email: apiUser.email ?? "",
      phoneNumber: apiUser.telephone ?? "",
      idCardNumber: apiUser.cniNumber ?? "",
      picture: apiUser.photoProfil ?? "",
      adress: apiUser.addresse ?? "",
      uid: apiUser.uid ?? "",
      userType: (apiUser.typeUsersId as unknown as UserType) ?? 0,
      statut: apiUser.statut ?? 0,
      idCardPicture: apiUser.photoCNI ?? "",
      idCardExpirationDate: apiUser.CNIDateDelivrer ?? "",
    });
  }

  static fromDomainToProperties(apiUser: User): UserFetched {
    const user = {
      id: apiUser.id,
      nom: apiUser.lastname,
      prenom: apiUser.firstname,
      email: apiUser.email,
      telephone: apiUser.phoneNumber,
      cniNumber: apiUser.idCardNumber,
      photoProfil: apiUser.picture,
      addresse: apiUser.address?.street,
      uid: apiUser.uid,
      typeUsersId: apiUser.userType,
      statut: apiUser.statut ?? 0,
      photoCNI: apiUser.idCardPicture,
      CNIDateDelivrer: apiUser.idCardExpirationDate,
    };

    const filtered = Object.entries(user)
      .filter(([key, value]) => value !== undefined && value !== "")
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return filtered as unknown as UserFetched;
  }
}
