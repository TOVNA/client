
import styles from "./Navbar.module.css";
import NavbarButton from "./NavbarButton/NavbarButton";
import LogoutIcon from "../../assets/logout.svg";
import UserIcon from "../../assets/user.svg";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const openUserProfile = useCallback(() => {
    navigate(`/teacher/${user?._id}`);
  }, [navigate, user?._id]);

  const goToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle} onClick={goToMainPage}>תובנ"ה</span>
      <div className={styles.navbarButtonContainer}>
        <NavbarButton iconSrc={UserIcon} onClick={openUserProfile} />
        <NavbarButton iconSrc={LogoutIcon} onClick={logout} name="התנתק" />
      </div>
    </div>
  );
};

export default Navbar;
