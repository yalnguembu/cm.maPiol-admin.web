import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "./ui/assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./ui/store";
import "react-toastify/dist/ReactToastify.css";
import { DependeciesContext } from "@/utils/useDepedencies";
import { UserService } from "@/primary/user";
import { PropertyService } from "@/primary/property";
import { ContractService } from "@/primary/contract";
import { FirebaseClient } from "@/secondary/FirebaseClient";
import { UserRessource } from "@/secondary/user/UserResssource";
import { PropertyRessource } from "@/secondary/property/PropertyResssource";
import { ContractRessource } from "@/secondary/contract/ContractResssource";
import { VisitService } from "@/primary/visit";
import { VisitRessource } from "@/secondary/visit/VisitRessource";

const firebaseClient = new FirebaseClient();

const userRepository = new UserRessource(firebaseClient);
const userServices = new UserService(userRepository);

const propertyRepository = new PropertyRessource(firebaseClient);
const propertyServices = new PropertyService(propertyRepository);

const contractRepository = new ContractRessource(firebaseClient);
const contractServices = new ContractService(contractRepository);

const visitRepository = new VisitRessource(firebaseClient)
const visitServices = new VisitService(visitRepository);


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <DependeciesContext.Provider
          value={{
            propertyServices,
            contractServices,
            userServices,
            visitServices,
          }}
        >
          <App />
        </DependeciesContext.Provider>
      </Provider>
    </BrowserRouter>
  </>
);
