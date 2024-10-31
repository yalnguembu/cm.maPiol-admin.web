import { User } from "..";
import { UserToSave } from "../types";

export interface UserRepository {
  createAdmin(form: UserToSave): Promise<string>;

  addAdditionnalInfos(userId: string, form: UserToSave): Promise<string>;

  createOwner(form: UserToSave): Promise<string>;

  getAllOwners(): Promise<User[]>;

  getAllTenants(): Promise<User[]>;

  getAllVisitors(): Promise<User[]>;

  getUser(userId: string): Promise<User>;

  getUserByUUID(userUUId: string): Promise<User>;

  updateUser(userId: string, form: UserToSave): Promise<void>;

  getCurrentUserSession(): User;

  login(email: string, password: string): User;
}
