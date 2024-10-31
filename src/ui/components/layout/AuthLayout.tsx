import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "@/ui/components/Loading";

const AuthLayout = () => {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        {<Outlet />}
      </Suspense>
    </>
  );
};

export default AuthLayout;
