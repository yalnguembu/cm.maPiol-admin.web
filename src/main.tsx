import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "./ui/assets/scss/app.scss";
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";
import store from "./ui/store";
import "react-toastify/dist/ReactToastify.css";
import {DependenciesContext} from "@/utils/useDependencies";
import {UserService} from "@/primary/user";
import {PropertyService} from "@/primary/property";
import {ContractService} from "@/primary/contract";
import {FirebaseClient} from "@/secondary/FirebaseClient";
import {UserRessource} from "@/secondary/user/UserResssource";
import {PropertyRessource} from "@/secondary/property/PropertyResssource";
import {NotificationResource} from "@/secondary/notification/NotificationResource";
import {NotificationService} from "@/primary/notification";
import {VisitRessource} from "@/secondary/visit/VisitRessource";
import {ContractRessource} from "@/secondary/contract/ContractResssource";
import {VisitService} from "@/primary/visit";

const firebaseClient = new FirebaseClient();

const userRepository = new UserRessource(firebaseClient);
const userServices = new UserService(userRepository);

const propertyRepository = new PropertyRessource(firebaseClient);
const propertyServices = new PropertyService(propertyRepository);

const contractRepository = new ContractRessource(firebaseClient);
const contractServices = new ContractService(contractRepository);

const visitRepository = new VisitRessource(firebaseClient)
const visitServices = new VisitService(visitRepository);

const notificationRepository = new NotificationResource(firebaseClient)
const notificationServices = new NotificationService(notificationRepository);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <DependenciesContext.Provider
          value={{
            propertyServices,
            contractServices,
            userServices,
            visitServices,
            notificationServices,
          }}
        >
          <App/>
        </DependenciesContext.Provider>
      </Provider>
    </BrowserRouter>
  </>
);
