import {User} from "@/domains/user";
import {ApiUser, UserFetched} from "./ApiUser";
import {UserRepository} from "@/domains/notification/repository/NotificationRepository";
import {UserToSave} from "@/domains/user/types";
import {FirebaseClient} from "@/secondary/FirebaseClient";
import {auth} from "@/utils/configs/firebase";
import {AddAdditionalInfos} from "@/domains/user/types";

export class UserRessource implements UserRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {
  }

  async getAllVisitors(): Promise<User[]> {
    const apiOwners = await this.firebaseClient.getDataByCondition<
      UserFetched[]
    >({
      collection: "Users",
      field: "typeUsersId",
      operator: "==",
      value: 1,
    });
    return apiOwners.map(ApiUser.toDomain);
  }

  async getAllOwners(): Promise<User[]> {
    const apiOwners = await this.firebaseClient.getDataByCondition<
      UserFetched[]
    >({
      collection: "Users",
      field: "typeUsersId",
      operator: "==",
      value: 3,
    });
    return apiOwners.map(ApiUser.toDomain);
  }

  async getAllTenants(): Promise<User[]> {
    const apiOwners = await this.firebaseClient.getDataByCondition<
      UserFetched[]
    >({
      collection: "Users",
      field: "typeUsersId",
      operator: "==",
      value: 2,
    });
    return apiOwners.map(ApiUser.toDomain);
  }

  async getUserByUUID(userUUId: string): Promise<User> {
    const user = await this.firebaseClient.getDataByCondition<UserFetched[]>({
      collection: "Users",
      field: "uid",
      operator: "==",
      value: userUUId,
    });
    return ApiUser.toDomain(user[0]);
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.firebaseClient.getDocumentByName<UserFetched>({
      collection: "Users",
      documentName: userId,
    });
    return ApiUser.toDomain(user);
  }

  async createAdmin(form: UserToSave): Promise<string> {
    const userProprietaire = await auth.createUserWithEmailAndPassword(
      form.email,
      form.email
    );

    const userCreated = userProprietaire.user;

    const userCreatedId = await this.firebaseClient.addDocument({
      collection: "Users",
      form: {
        typeUser: 3,
        addresse: form.address,
        nom: form.lastname,
        prenom: form.firstname,
        cniNumber: form.idCardNumber,
        email: form.address,
        profileImage: form.picture,
        telephone: form.phoneNumber,
        uid: userCreated.uid,
      },
    });
    return userCreatedId;
  }

  async createOwner(form: UserToSave): Promise<User> {
    const userProprietaire = await auth.createUserWithEmailAndPassword(
      form.email,
      form.password
    );

    const userCreated = userProprietaire.user;

    const userFom = {
      typeUsersId: 3,
      nom: form.lastname,
      prenom: form.firstname,
      email: form.email,
      uid: userCreated.uid,
    };

    const userCreatedId = await this.firebaseClient.addDocument({
      collection: "Users",
      form: userFom,
    });

    if (!userCreatedId) return;

    const user = {...userFom, id: userCreatedId};
    // localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("userConnect", userCreatedId);
    return ApiUser.toDomain(user);
  }

  async updateUser(userId: string, form: UserToSave): Promise<void> {
    await this.firebaseClient.updateDocument({
      collection: "Users",
      documentName: userId,
      form,
    });
  }

  async addAdditionalInfos(
    userId: string,
    form: AddAdditionalInfos
  ): Promise<void> {
    const profilePictureLink = await this.firebaseClient.saveImage(form.picture);
    const idCardImageLink = await this.firebaseClient.saveImage(form.idCardPicture);

    await this.firebaseClient.updateDocument({
      collection: "Users",
      documentName: userId,
      form: ApiUser.fromDomainToProperties({
        ...form,
        idCardPicture: idCardImageLink,
        picture: profilePictureLink
      }),
    });
  }

  getCurrentUserSession(): User | null {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return ApiUser.toDomain(JSON.parse(storedUser));
    return null;
  }

  async login(email: string, password: string): User {
    const user1 = await auth.signInWithEmailAndPassword(email, password);

    if (user1) {
      const currentUserId = auth.currentUser.uid;

      localStorage.setItem("Useruid", `${currentUserId}`);

      const users = await this.firebaseClient.getDataByCondition<UserFetched[]>(
        {
          collection: "Users",
          field: "uid",
          operator: "==",
          value: currentUserId,
        }
      );

      if (users.length) {
        let user = users[0];
        localStorage.setItem("user", JSON.stringify(user));
        user = ApiUser.toDomain(users[0]);
        localStorage.setItem("userConnect", user.id);
        return user;
      }
    }
  }
}
