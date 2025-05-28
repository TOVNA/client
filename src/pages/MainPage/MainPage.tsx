import React from "react";
import Style from "./MainPage.module.css";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <div className={Style.mainPage}>
      <Sidebar />
      <div className={Style.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
