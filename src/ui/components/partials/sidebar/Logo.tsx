import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/ui/hooks/useDarkMode";
import useSidebar from "@/ui/hooks/useSidebar";
import useSemiDark from "@/ui/hooks/useSemiDark";
import useSkin from "@/ui/hooks/useSkin";

// import images
import MobileLogo from "@/ui/assets/images/logo/logo.png";
import MobileLogoWhite from "@/ui/assets/images/logo/logo-orange.png";
import { homePages } from "@/utils/menus";

const SidebarLogo = ({ menuHover, user }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex border justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link to={`${homePages[user?.userType || 1]}`}>
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img src={MobileLogo} alt="" />
            ) : (
              <img src={MobileLogoWhite} alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {/* DashCode */}
              </h1>
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
