
import styles from "./Navbar.module.css";
import NavbarButton from "./NavbarButton/NavbarButton";
import LogoutIcon from "../../assets/logout.svg";
import UserIcon from "../../assets/user.svg";
import manageIcon from "../../assets/manage.svg";
import { useAuth } from "../AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Navbar = () => {
  const { logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const openUserProfile = useCallback(() => {
    navigate(`/teacher/${user?.teacher_id}`);
  }, [navigate, user?.teacher_id]);

  const goToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);


  const isInAdminPages = location.pathname.startsWith("/admin");

  const onAdminButtonClick = () => {
    const urlToNavigate = isInAdminPages ? "/" : "/admin";
    navigate(urlToNavigate);
  };

  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle}>תובנ"ה</span>
      <div className={styles.buttons}>
        <div className={styles.navbar}>
          <span className={styles.navbarTitle} onClick={goToMainPage}>תובנ"ה</span>
          <div className={styles.navbarButtonContainer}>
            {!isAdmin && <NavbarButton iconSrc={UserIcon} onClick={openUserProfile} />}
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
      </div>
    </div>
  );
}

export default Navbar;
