import React, {Suspense, useEffect, useRef} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "@/ui/components/partials/header";
import Sidebar from "@/ui/components/partials/sidebar";
import Settings from "@/ui/components/partials/settings";
import useWidth from "@/ui/hooks/useWidth";
import useSidebar from "@/ui/hooks/useSidebar";
import useContentWidth from "@/ui/hooks/useContentWidth";
import useMenulayout from "@/ui/hooks/useMenulayout";
import useMenuHidden from "@/ui/hooks/useMenuHidden";
import Footer from "@/ui/components/partials/footer";
import MobileMenu from "../partials/sidebar/MobileMenu";
import useMobileMenu from "@/ui/hooks/useMobileMenu";
import MobileFooter from "@/ui/components/partials/footer/MobileFooter";
import {ToastContainer} from "react-toastify";
import Loading from "@/ui/components/Loading";
import {motion} from "framer-motion";

import {onAuthStateChanged} from "firebase/auth";

import { auth } from "@/utils/configs/firebase";

const Layout = () => {
  const navigate = useNavigate();
  const {width, breakpoints} = useWidth();
  const [collapsed] = useSidebar();

  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const nodeRef = useRef(null);

  useEffect(() => {
    console.log("hey");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (!user) {
        navigate("/auth/login");
        // L'utilisateur n'est pas authentifié
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <ToastContainer/>
      <Header className={width > breakpoints.lg ? switchHeaderClass() : ""}/>
      {menuType === "vertical" && width >= breakpoints.lg && !menuHidden && (
        <Sidebar/>
      )}
      <MobileMenu
        className={`${
          width < breakpoints.lg && mobileMenu
            ? "left-0 visible opacity-100  z-[9999]"
            : "left-[-300px] invisible opacity-0  z-[-999] "
        }`}
      />
      {/* mobile menu overlay*/}
      {width < breakpoints.lg && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}
      <Settings/>
      <div
        className={`content-wrapper transition-all duration-150 ${
          width > 1024 ? switchHeaderClass() : ""
        }`}
      >
        {/* md:min-h-screen will h-full*/}
        <div className="page-content   page-min-height  ">
          <div
            className={
              contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
            }
          >
            <Suspense fallback={<Loading/>}>
              <motion.div
                key={location.pathname}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                    y: 50,
                  },
                  pageAnimate: {
                    opacity: 1,
                    y: 0,
                  },
                  pageExit: {
                    opacity: 0,
                    y: -50,
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                {<Outlet/>}
              </motion.div>
            </Suspense>
          </div>
        </div>
      </div>
      {width < breakpoints.md && <MobileFooter/>}
      {width > breakpoints.md && (
        <Footer className={width > breakpoints.lg ? switchHeaderClass() : ""}/>
      )}
    </>
  );
};

export default Layout;
