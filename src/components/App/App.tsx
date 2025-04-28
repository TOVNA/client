import React from "react";
import { Routes, Route } from "react-router-dom";
import Style from "./App.module.css";
import Register from "../../pages/Register";
import { AuthProvider } from "../AuthContext";
import Login from "../../pages/Login";
import ProtectedRoute from "../ProtectedRoute";
import { Toaster } from "react-hot-toast";
import MainPage from "../../pages/MainPage/MainPage";
import { SelectedClassContextProvider } from "../SelectedClassContext/SelectedClassContext";
import "../../setupTable";
import { SelectedStudentContextProvider } from "../SelectedStudentContext/SelectedStudentContext";
import { AdminPage } from "../../pages/AdminPage/AdminPage";
import { TeacherForm } from "../Forms/TeacherForm/TeacherForm";
import { TeachersTable } from "../TeachersTable";

export const App: React.FC = ({}) => {
  // const { isAdmin, user } = useAuth();
  // const location = useLocation();

  // const RedirectAdmin = ({ children }) => {
  //   if (user && isAdmin && location.pathname === "/") {
  //     return <Navigate to="/admin" replace />;
  //   }
  // };

  return (
    <AuthProvider>
      <SelectedClassContextProvider>
        <SelectedStudentContextProvider>
          <div className={Style.app}>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  backgroundColor: "#1f1f1f",
                  color: "white",
                },
              }}
            />
            {/* <RedirectAdmin> */}
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminPage />}>
                  <Route path="teachers" element={<TeachersTable />} />
                  {/* <Route path="students" element={<AdminTable />} /> */}
                  {/* <Route path="classes" element={<AdminTable />} /> */}
                  <Route path="teacher/:id" element={<TeacherForm />} />
                  <Route path="*" element={<AdminPage />} />
                </Route>
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<MainPage />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
            {/* </RedirectAdmin> */}
          </div>
        </SelectedStudentContextProvider>
      </SelectedClassContextProvider>
    </AuthProvider>
  );
};

export default App;
