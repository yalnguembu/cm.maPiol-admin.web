import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import {
  visitorMenus,
  adminMenus,
  ownerMenus,
  tenantMenus,
} from "@/utils/menus";
import SimpleBar from "simplebar-react";
import useSidebar from "@/ui/hooks/useSidebar";
import useSemiDark from "@/ui/hooks/useSemiDark";
import useSkin from "@/ui/hooks/useSkin";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [refreshNotifications, setRefreshNotifications] = useState(false);

  // const user = auth.currentUser;

  const {
    user: profile,
    isAdmin,
    isOwner,
    isTenant,
  } = useSelector((state) => state.auth);

  const menuItems = isAdmin
    ? adminMenus
    : isOwner
    ? ownerMenus
    : isTenant
    ? tenantMenus
    : visitorMenus;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
    // const fetchDataInterval = setInterval(recuperer, 5000); // 5 seconds

    // return () => clearInterval(fetchDataInterval); // Cleanup on unmount
  }, []);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

  return (
    <div
      key={refreshNotifications.toString()}
      className={isSemiDark ? "dark" : ""}
    >
      <div
        className={`sidebar-wrapper bg-white dark:bg-slate-800     ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
      ${menuHover ? "sidebar-hovered" : ""}
      ${
        skin === "bordered"
          ? "border-r border-slate-200 dark:border-slate-700"
          : "shadow-base"
      }
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} user={profile} />
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>
        <SimpleBar
          className="sidebar-menu px-4 h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Navmenu menus={menuItems} />
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
