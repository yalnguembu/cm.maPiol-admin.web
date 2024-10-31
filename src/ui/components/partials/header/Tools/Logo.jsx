import React from "react";
import useDarkMode from "@/ui/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/ui/hooks/useWidth";

import MainLogo from "@/ui/assets/images/logo/logo.png";
import LogoWhite from "@/ui/assets/images/logo/logo.png";
import MobileLogo from "@/ui/assets/images/logo/logo.png";
import MobileLogoWhite from "@/ui/assets/images/logo/logo.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" style={{width:"200px"}}/>
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" style={{width:"200px"}} />
        )}
      </Link>
    </div>
  );
};

export default Logo;
