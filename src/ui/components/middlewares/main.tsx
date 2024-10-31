import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { homePages } from "@/utils/menus";

import { useSelector } from "react-redux";
type MiddlewareProps = { permition: number };
const Middleware = ({ permition }: MiddlewareProps) => {
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.userType != permition) {
      console.log(permition);
      
      navigate(homePages[user?.userType]);
    }
  }, [isAuth, navigate]);

  return <Outlet />;
};

export default Middleware;
