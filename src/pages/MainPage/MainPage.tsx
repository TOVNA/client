import React from "react";
import Style from "./MainPage.module.css";
import Sidebar from "../../components/Sidebar";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <div className={Style.mainPage}>
      תובנה
      <Sidebar />
    </div>
  );
};

export default MainPage;
