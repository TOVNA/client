import React from "react";
import Style from "./MainPage.module.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <div className={Style.mainPage}>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default MainPage;
