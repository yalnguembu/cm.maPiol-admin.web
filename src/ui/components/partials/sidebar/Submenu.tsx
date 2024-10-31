import React, { useState, useEffect } from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import Icon from "@/ui/components/ui/Icon";
import Multilevel from "./Multi";
import { auth, db, imgdb } from "@/utils/configs/firebase";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { getDocs, where, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Submenu = ({
  activeSubmenu,
  item,
  i,
  toggleMultiMenu,
  activeMultiMenu,
}) => {
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  const user = auth.currentUser;
  // Fonction pour rafraîchir les notifications après un certain délai
  const modifier = async (data) => {
    if (data.etatnotif == 6) {
      const notificationQuincaillerieQuery = query(
        collection(db, "notificationQuincaillerie"),
        where("quincailleruid", "==", user.uid),
        where("type", "==", "bonCmde")
      );
      try {
        const querySnapshot = await getDocs(notificationQuincaillerieQuery);

        // Iterate through each document and update its state

        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const notificationRef = doc.ref;

          await updateDoc(notificationRef, {
            etat: true,
          });
        });

        // Wait for all updates to complete

        await Promise.all(updatePromises);

        console.log(
          "État mis à jour avec succès pour toutes les notifications."
        );
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des notifications : ",
          error
        );
      }
    } else {
      const notificationQuincaillerieQuery = query(
        collection(db, "notificationQuincaillerie"),
        where("quincailleruid", "==", user.uid),
        where("etatdevis", "==", data.etatnotif)
      );

      try {
        const querySnapshot = await getDocs(notificationQuincaillerieQuery);

        // Iterate through each document and update its state

        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const notificationRef = doc.ref;

          await updateDoc(notificationRef, {
            etat: true,
          });
        });

        // Wait for all updates to complete

        await Promise.all(updatePromises);

        console.log(
          "État mis à jour avec succès pour toutes les notifications."
        );
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des notifications : ",
          error
        );
      }
    }
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="sub-menu  space-y-4  ">
        {item.child?.map((subItem, j) => (
          <li key={j} className="block pl-4 pr-1 first:pt-4  last:pb-4">
            {subItem?.multi_menu ? (
              <div>
                <div
                  onClick={() => toggleMultiMenu(j)}
                  className={`${
                    activeMultiMenu
                      ? " text-black dark:text-white font-medium"
                      : "text-slate-600 dark:text-slate-300"
                  } text-sm flex space-x-3 items-center transition-all duration-150 cursor-pointer rtl:space-x-reverse`}
                >
                  <span
                    className={`${
                      activeMultiMenu === j
                        ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                        : ""
                    } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none `}
                  ></span>
                  <span className="flex-1">{subItem.childtitle}</span>
                  <span className="flex-none">
                    <span
                      className={`menu-arrow transform transition-all duration-300 ${
                        activeMultiMenu === j ? " rotate-90" : ""
                      }`}
                    >
                      <Icon icon="ph:caret-right" />
                    </span>
                  </span>
                </div>
                <Multilevel
                  activeMultiMenu={activeMultiMenu}
                  j={j}
                  subItem={subItem}
                />
              </div>
            ) : (
              <NavLink
                to={subItem.childlink}
                onClick={() => {
                  // modifier(subItem);
                }}
              >
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? " text-black dark:text-white font-medium"
                        : "text-slate-600 dark:text-slate-300"
                    } text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
                  >
                    <span
                      className={`${
                        isActive
                          ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                          : ""
                      } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                    ></span>
                    <span className="flex-1">{subItem.childtitle}</span>
                    <span key={refreshNotifications.toString()}>
                      {" "}
                      {subItem.etatvu > 0 && (
                        <span className="flex-1 lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white">
                          {subItem.etatvu}
                        </span>
                      )}
                    </span>
                  </span>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Submenu;
