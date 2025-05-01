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
import { ClassesTable } from "../ClassesTable";
import { StudentsTable } from "../StudentsTable";
import { StudentForm } from "../Forms/StudentForm/StudentForm";
import { ClassForm } from "../Forms/ClassForm/ClassForm";

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
                  <Route path="students" element={<StudentsTable />} />
                  <Route path="classes" element={<ClassesTable />} />
                  <Route path="teacher/:id" element={<TeacherForm />} />
                  <Route path="student/:id" element={<StudentForm />} />
                  <Route path="student" element={<StudentForm />} />
                  {/* <Route path="class/:id" element={<ClassForm />} />
                  <Route path="class" element={<ClassForm />} /> */}
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
