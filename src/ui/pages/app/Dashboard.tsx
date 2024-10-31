import React from "react";
import Icon from "@/ui/components/ui/Icon";

import shade1 from "@/ui/assets/images/all-img/shade-1.png";
import shade2 from "@/ui/assets/images/all-img/shade-2.png";
import shade3 from "@/ui/assets/images/all-img/shade-3.png";
import shade4 from "@/ui/assets/images/all-img/shade-4.png";
const statistics = [
  {
    title: "Proprietaires",
    count: "354",
    bg: "bg-warning-500",
    text: "text-primary-500",
    percent: "25.67% ",
    icon: "heroicons:arrow-trending-up",
    img: shade1,
    percentClass: "text-primary-500",
  },
  {
    title: "Locataires ",
    count: "86,954",

    bg: "bg-info-500",
    text: "text-primary-500",
    percent: "8.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade2,
    percentClass: "text-primary-500",
  },
  {
    title: "Propietes",
    count: "50,000",
    bg: "bg-primary-500",
    text: "text-danger-500",
    percent: "1.67%  ",
    icon: "heroicons:arrow-trending-down",
    img: shade3,
    percentClass: "text-danger-500",
  },
  {
    title: "Contrats",
    count: "125,654",
    bg: "bg-success-500",
    text: "text-primary-500",
    percent: "11.67%  ",
    icon: "heroicons:arrow-trending-up",
    img: shade4,
    percentClass: "text-primary-500",
  },
];
const GroupChart3 = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {statistics.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
        >
          <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
            <img
              src={item.img}
              alt=""
              draggable="false"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
            {item.count}
          </span>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className={` flex-none text-xl  ${item.text} `}>
              <Icon icon={item.icon} />
            </div>
            <div className="flex-1 text-sm">
              <span className={` block mb-[2px] ${item.percentClass} `}>
                {item.percent}
              </span>
              <span className="block mb-1 text-slate-600 dark:text-slate-300">
                Depuis la semaine dernière
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupChart3;
