import React from "react";
import Style from "./NavbarButton.module.css";

interface NavbarButtonProps {
  name?: string;
  iconSrc: string;
  onClick?: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  name,
  iconSrc,
  onClick,
}) => {
  return (
    <div className={Style.button} onClick={onClick}>
      <img src={iconSrc} className={Style.icon} />
      {name}
    </div>
  );
};

export default NavbarButton;
