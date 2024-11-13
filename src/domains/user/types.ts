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
  address?: string;
  userType?: UserType;
  uid: string;
  status?: number;
  idCardPicture?: string;
  idCardExpirationDate?: string;
  password?: string;
  certificate?: string;
  buildPermit?: string;
};

export type UserToSave = Omit<UserProperties, "id" | "uid" | "userType" | "status">;

export type AddAdditionalInfos = Pick<UserProperties, "idCardNumber" | "phoneNumber" | "idCardPicture" | "idCardExpirationDate"  | "picture" | "address">;