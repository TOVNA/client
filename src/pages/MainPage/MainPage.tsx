import React from "react";
import Style from "./MainPage.module.css";

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = ({ }) => {
  return (
    <div className={Style.mainPage}>
      תובנה
    </div>
  );
};

export default MainPage;
