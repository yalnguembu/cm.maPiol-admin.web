import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./common/reg-from";
import Logo from "@/ui/assets/images/logo/logo.png";
import AdditionnalInfos from "./common/AdditionnalInfo";

const Register = () => {
  const [shouldDisplayAdditionnal, setShouldDisplayAdditionnal] =
    useState(false);
  const [userId, setUserId] = useState("vzBbyiUrVoqZNzT1Or4p");

  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="left-column relative z-[1]">
          <div className="absolute left-0 bottom-0 h-full w-full z-[-1]">
            <img src={Logo} alt="" className="h-full w-full object-contain" />
          </div>
        </div>
        <div className="right-column relative bg-white dark:bg-slate-800">
          {!shouldDisplayAdditionnal ? (
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img src={Logo} alt="" className="mx-auto" />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Creez un compte pour commencer a utiliser Kinaru
                  </div>
                </div>
                <RegisterForm
                  next={(id) => {
                    setShouldDisplayAdditionnal(true);
                    setUserId(id);
                  }}
                />

                <div className="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 text-sm">
                  Already registered?{" "}
                  <Link
                    to="/auth/login"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <AdditionnalInfos userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
