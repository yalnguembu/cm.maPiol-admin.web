import { UserRepository } from "domains/user/repository/UserRepository";
import {
  CreateAdminUseCase,
  CreateOwnerUseCase,
  UpdateUserUseCase,
  GetOwnersUseCase,
  GetTenantsUseCase,
  GetUserUseCase,
  LoginUseCase,
  GetVisitorsUseCase,
  GetCurrentUserSessionUseCase,
  GetUserByUUIDUseCase,
  AdditionalInfosUseCase,
} from "./useCases";
import { AddAdditionalInfos, UserId, UserToSave } from "domains/user/types";

export class UserService {
  private getUsersUseCase: GetUserUseCase;
  private getUserByUUIDUsecase: GetUserByUUIDUseCase;
  private createAdminUseCase: CreateAdminUseCase;
  private createOwnerUseCase: CreateOwnerUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private getOwnersUseCase: GetOwnersUseCase;
  private getVisitorsUseCase: GetVisitorsUseCase;
  private getTenantsUseCase: GetTenantsUseCase;
  private getCurrentUserSessionUseCase: GetCurrentUserSessionUseCase;
  private loginUseCase: LoginUseCase;
  private addAdditionalInfosUseCase: AdditionalInfosUseCase;

  constructor(userRepository: UserRepository) {
    this.getUsersUseCase = new GetUserUseCase(userRepository);
    this.getUserByUUIDUsecase = new GetUserByUUIDUseCase(userRepository);
    this.createAdminUseCase = new CreateAdminUseCase(userRepository);
    this.createOwnerUseCase = new CreateOwnerUseCase(userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    this.getOwnersUseCase = new GetOwnersUseCase(userRepository);
    this.getVisitorsUseCase = new GetVisitorsUseCase(userRepository);
    this.getTenantsUseCase = new GetTenantsUseCase(userRepository);
    this.getCurrentUserSessionUseCase = new GetCurrentUserSessionUseCase(
      userRepository
    );
    this.loginUseCase = new LoginUseCase(userRepository);
    this.addAdditionalInfosUseCase = new AdditionalInfosUseCase(
      userRepository
    );
  }

  async getUserById(id: string) {
    return await this.getUsersUseCase.execute(id);
  }

  async getUserByUUID(id: string) {
    return await this.getUserByUUIDUsecase.execute(id);
  }

  async getAllOwners() {
    return await this.getOwnersUseCase.execute();
  }

  async getAllVisitors() {
    return await this.getVisitorsUseCase.execute();
  }

  async getAllTenants() {
    return await this.getTenantsUseCase.execute();
  }

  async createAdminUser(user: UserToSave) {
    return await this.createAdminUseCase.execute(user);
  }

  async createOwner(user: UserToSave) {
    return await this.createOwnerUseCase.execute(user);
  }

  async addAdditionalInfos(id: string, user: AddAdditionalInfos) {
    return await this.addAdditionalInfosUseCase.execute(id, user);
  }

  async updateUser(userId: UserId, form: UserToSave) {
    return await this.updateUserUseCase.execute(userId, form);
  }

  getCurrentUserSession() {
    return this.getCurrentUserSessionUseCase.execute();
  }

  async login(email: string, password: string) {
    return await this.loginUseCase.execute(email, password);
  }
}
