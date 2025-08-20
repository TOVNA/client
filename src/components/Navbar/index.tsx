import styles from "./Navbar.module.css";
import NavbarButton from "./NavbarButton/NavbarButton";
import LogoutIcon from "../../assets/logout.svg";
import manageIcon from "../../assets/manage.svg";
import { useAuth } from "../AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isInAdminPages = location.pathname.startsWith("/admin");

  const onAdminButtonClick = () => {
    const urlToNavigate = isInAdminPages ? "/" : "/admin";
    navigate(urlToNavigate);
  };

  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle}>תובנ"ה</span>
      <div className={styles.buttons}>
        {isAdmin && (
          <NavbarButton
            iconSrc={manageIcon}
            onClick={onAdminButtonClick}
            name={isInAdminPages ? "חזרה למערכת" : "ניהול המערכת"}
          />
        )}

        <NavbarButton iconSrc={LogoutIcon} onClick={logout} name="התנתק" />
      </div>
    </div>
  );
};

export default Navbar;
