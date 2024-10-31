import React from "react";
import Icon from "@/ui/components/ui/Icon";
import Modal from "@/ui/components/ui/Modal";
import { UserView } from "@/primary/UserView";

type Props = {
  user: UserView;
  isActive: boolean;
  onClose: () => void;
};
const UserDetailsModal = (props: Props) => {
  const { isActive, onClose, user } = props;

  return (
    <Modal
      activeModal={isActive}
      onClose={onClose}
      className="max-w-xl"
      centered
      title="User Details"
    >
      <div className="flex gap-12 px-8 py-6">
        <div className="self-center md:h-[186px] md:w-[186px] h-[140px] w-[140px]">
          <img
            src={user?.picture}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <ul className="list space-y-6">
          <li className="flex space-x-3 rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="heroicons:envelope" />
            </div>
            <div className="flex-1">
              <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                EMAIL
              </div>
              <a
                href={`mailto:${user?.email}`}
                className="text-base text-slate-600 dark:text-slate-50"
              >
                {user?.email}
              </a>
            </div>
          </li>

          <li className="flex space-x-3 rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="heroicons:phone-arrow-up-right" />
            </div>
            <div className="flex-1">
              <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                TELEPHONE
              </div>
              <a
                href={`tel:${user?.phoneNumber}`}
                className="text-base text-slate-600 dark:text-slate-50"
              >
                {user?.phoneNumber}
              </a>
            </div>
          </li>

          <li className="flex space-x-3 rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="heroicons:map-pin" />
            </div>
            <div className="flex-1">
              <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                LOCALISATION
              </div>
              <div className="text-base text-slate-600 dark:text-slate-50">
                {JSON.stringify(user?.adress)}
              </div>
            </div>
          </li>
          <li className="flex space-x-3 rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                NUMERO CNI
              </div>
              <div className="text-base text-slate-600 dark:text-slate-50">
                {user?.idCardNumber}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
