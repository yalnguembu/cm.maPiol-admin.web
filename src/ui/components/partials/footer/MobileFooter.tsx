import React, { useState } from "react";
import Icon from "@/ui/components/ui/Icon";
import { NavLink } from "react-router-dom";

const MobileFooter = () => {
  const [notifications, setNotifications] = useState([]);
  return <div></div>
  // return (
  //   <div className="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-[9999] bottom-0 py-[12px] px-4">
  //  
  //     <NavLink to="notifications">
  //       {({ isActive }) => (
  //         <div>
  //           <span
  //             className={` relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1
  //     ${isActive ? "text-primary-500" : "dark:text-white text-slate-900"}
  //         `}
  //           >
  //             <Icon icon="heroicons-outline:bell" />
  //             {notifications.length > 0 && (  <span className="absolute right-[17px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
  //               {notifications.length}
  //             </span>)}
  //           </span>
  //           <span
  //             className={` block text-[11px]
  //        ${isActive ? "text-primary-500" : "text-slate-600 dark:text-slate-300"}
  //       `}
  //           >
  //             Notifications
  //           </span>
  //         </div>
  //       )}
  //     </NavLink>
  //   </div>
  // );
};

export default MobileFooter;
