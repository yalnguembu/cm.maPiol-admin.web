import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/ui/hooks/useDarkMode";

import MainLogo from "@/ui/assets/images/logo/logo.png";
import LogoWhite from "@/ui/assets/images/logo/logo.png";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link to="/">
      <img src={isDark ? LogoWhite : MainLogo} alt="" style={{width:"200px"}}/>
    </Link>
  );
};

export default MobileLogo;
