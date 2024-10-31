import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./ui/pages/auth/login"));
const Register = lazy(() => import("./ui/pages/auth/register"));
const ForgotPass = lazy(() => import("./ui/pages/auth/forgot-password"));
const Error = lazy(() => import("./ui/pages/404"));

const PropertyListPage = lazy(
  () => import("./ui/pages/app/properties/ListPage")
);
const AddProperty = lazy(() => import("./ui/pages/app/properties/AddProperty"));
const PropertyDetails = lazy(
  () => import("./ui/pages/app/properties/PropertyDetails")
);
const EditProperty = lazy(
  () => import("./ui/pages/app/properties/EditProperty")
);
const ContractListPage = lazy(
  () => import("./ui/pages/app/contracts/ListPage")
);
const AddContract = lazy(() => import("./ui/pages/app/contracts/AddContract"));
const ContractDetails = lazy(
  () => import("./ui/pages/app/contracts/ContractDetails")
);
const UserProfile = lazy(() => import("./ui/pages/app/Profile"));
const AdminDashbord = lazy(() => import("./ui/pages/app/Dashboard"));
const UsersList = lazy(() => import("./ui/pages/app/Users"));
const VisitsList = lazy(() => import("./ui/pages/app/Visits"));
const AdditionnalInfo = lazy(
  () => import("./ui/pages/auth/common/AdditionnalInfo")
);

// middelwares
const TenantMiddleWare = lazy(
  () => import("./ui/components/middlewares/tenant")
);
const OwnerMiddleWare = lazy(() => import("./ui/components/middlewares/owner"));
const AdminMiddleWare = lazy(() => import("./ui/components/middlewares/admin"));

import Layout from "./ui/components/layout/Layout";
import AuthLayout from "./ui/components/layout/AuthLayout";

import Loading from "./ui/components/Loading";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPass />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="owner" element={<OwnerMiddleWare />}>
            <Route path="properties">
              <Route index element={<PropertyListPage />} />
              <Route path="add" element={<AddProperty />} />
              <Route path=":id" element={<PropertyDetails />} />
              <Route path=":id/edit" element={<EditProperty />} />
            </Route>
            <Route path="contracts">
              <Route path="pending" element={<ContractListPage />} />
              <Route path="add" element={<AddContract />} />
              <Route path=":id" element={<ContractDetails />} />
            </Route>
            <Route path="calendars" element={<VisitsList />} />
          </Route>
          <Route path="tenant" element={<TenantMiddleWare />}>
            <Route path="properties">
              <Route index element={<PropertyListPage />} />
              <Route path=":id" element={<PropertyDetails />} />
            </Route>
            <Route path="contracts">
              <Route path="pending" element={<ContractListPage />} />
            </Route>
            <Route path="calendars" element={<VisitsList />} />
          </Route>
          <Route path="admin" element={<AdminMiddleWare />}>
            <Route path="dashbord" element={<AdminDashbord />} />
            <Route path="calendars" element={<VisitsList />} />
            <Route path="properties">
              <Route index element={<PropertyListPage />} />
              <Route path=":id" element={<PropertyDetails />} />
            </Route>
            <Route path="users">
              <Route
                path="visitors"
                element={<UsersList userType="VISITOR" />}
              />
              <Route path="tenants" element={<UsersList userType="TENANT" />} />
              <Route path="owners" element={<UsersList userType="OWNER" />} />
            </Route>
            <Route path="contracts">
              <Route path="pending" element={<ContractListPage />} />
            </Route>
          </Route>
          <Route path="properties">
            <Route index element={<PropertyListPage />} />
            <Route path=":id" element={<PropertyDetails />} />
          </Route>
          <Route path="contracts">
            <Route path="pending" element={<ContractListPage />} />
            <Route path=":id" element={<ContractDetails />} />
          </Route>
          <Route path="profile" element={<UserProfile />} />
          <Route
            path="additionnal-informations"
            element={<AdditionnalInfo userId="" />}
          />
        </Route>
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
