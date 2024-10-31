export type UserId = string;
export type UserType = 0 | 1 | 2 | 3 | 4;

export type UserProperties = {
  id: UserId;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  idCardNumber: string;
  picture?: string;
  adress?: string;
  userType?: UserType;
  uid: string;
  statut?: number;
  idCardPicture?: string;
  idCardExpirationDate?: string;
  password?: string;
};

export type UserToSave = Omit<UserProperties, "id" | "uid" | "userType" | "statut">;

export type AddAdditionnalInfos = Pick<UserProperties, "idCardNumber" | "phoneNumber" | "idCardPicture" | "idCardExpirationDate">;