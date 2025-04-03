import styles from "./Navbar.module.css";
import NavbarButton from "./NavbarButton/NavbarButton";
import LogoutIcon from "../../assets/logout.svg";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle}>תובנ"ה</span>
      <NavbarButton iconSrc={LogoutIcon} onClick={logout} name="התנתק" />
    </div>
  );
};

export default Navbar;
