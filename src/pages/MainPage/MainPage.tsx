import React from "react";
import Style from "./MainPage.module.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content/Content";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  return (
    <div className={Style.mainPage}>
      <Navbar />
      <Sidebar />
      <div className={Style.content}>
        <Content />
      </div>
    </div>
  );
};

export default MainPage;
