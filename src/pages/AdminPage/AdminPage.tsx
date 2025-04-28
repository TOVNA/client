import React from "react";
import Style from "./AdminPage.module.css";
import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router";

interface AdminPageProps {}

export const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return (
    <div className={Style.adminPage}>
      <AdminSidebar />
      <div className={Style.content}>
        <Outlet />
      </div>
    </div>
  );
};
