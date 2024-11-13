import {createContext} from "react";
import {UserService} from "@/primary/user";
import {PropertyService} from "@/primary/property";
import {FirebaseClient} from "@/secondary/FirebaseClient";
import {UserRessource} from "@/secondary/user/UserResssource";
import {PropertyRessource} from "@/secondary/property/PropertyResssource";
import type {UserRepository} from "@/domains/user/repository/UserRepository";
import type {PropertyRepository} from "@/domains/property/repository/PropertyRepository";
import type {ContractRepository} from "@/domains/contract/repository/ContractRepository";
import type {NotificationRepository} from "@/domains/notification/repository/NotificationRepository";

export const useDependencies = () => {
  const firebaseClient = new FirebaseClient();
  const userRepository = new UserRessource(firebaseClient);
  const userServices = new UserService(userRepository);

  const propertyRepository = new PropertyRessource(firebaseClient);
  const propertyServices = new PropertyService(propertyRepository);

  return {
    userServices,
    propertyServices,
  };
};

export const DependenciesContext = createContext<ServicesContext>({
  userServices: null,
  propertyServices: null,
  contractServices: null,
  notificationServices: null,
});


export type ServicesContext = {
  userServices: UserRepository,
  propertyServices: PropertyRepository,
  contractServices: ContractRepository,
  notificationServices: NotificationRepository,
}