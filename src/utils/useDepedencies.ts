import { UserService } from "@/primary/user";
import { PropertyService } from "@/primary/property";
import { FirebaseClient } from "@/secondary/FirebaseClient";
import { UserRessource } from "@/secondary/user/UserResssource";
import { PropertyRessource } from "@/secondary/property/PropertyResssource";

export const useDepedencies = () => {
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

import { createContext } from "react";

export const DependeciesContext = createContext({
  userServices: null,
  propertyServices: null,
  contractServices: null,
});
