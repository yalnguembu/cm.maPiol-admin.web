import type { User } from "..";
import type { UserToSave } from "../types";

export interface UserRepository {
  createAdmin(form: UserToSave): Promise<string>;

  addAdditionalInfos(userId: string, form: UserToSave): Promise<string>;

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
