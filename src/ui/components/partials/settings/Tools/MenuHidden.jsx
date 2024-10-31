import React from "react";
import Switch from "@/ui/components/ui/Switch";
import useMenuHidden from "@/ui/hooks/useMenuHidden";

const MenuHidden = () => {
  const [menuHidden, setMenuHidden] = useMenuHidden();
  return (
    <div className=" flex justify-between">
      <div className="text-slate-600 text-base dark:text-slate-300 font-normal">
        Menu Hidden
      </div>
      <Switch
        value={menuHidden}
        onChange={() => setMenuHidden(!menuHidden)}
        id="semi_nav_tools3"
      />
    </div>
  );
};

export default MenuHidden;
