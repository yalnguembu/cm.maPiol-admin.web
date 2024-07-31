import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

const Dashboard = lazy(() => import("./pages/dashboard"));

const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password"));
const NotFound = lazy(() => import("./pages/404"));

function App() {
  return (
    <AuthProvider>
      <main className="App  relative">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="owner">
              <Route index element={<Dashboard />} />
              <Route path="housing">
                <Route index element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            {/* <Route index element={<LockScreen />} /> */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
// import Login from "./components/auth/login";
// import Register from "./components/auth/register";

// import Header from "./components/header";
// import Home from "./components/home";

// import { useRoutes } from "react-router-dom";

// function App() {
//   const routesArray = [
//     {
//       path: "*",
//       element: <Login />,
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//     },
//     {
//       path: "/home",
//       element: <Home />,
//     },
//   ];
//   let routesElement = useRoutes(routesArray);
//   return (
//     <AuthProvider>
//       <Header />
//       <div className="w-full h-screen flex flex-col">{routesElement}</div>
//     </AuthProvider>
//   );
// }

// export default App;
