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
import QuestionnairePage from "../../pages/Feedback";
import { ClassesTable } from "../ClassesTable";
import { StudentsTable } from "../StudentsTable";
import { StudentForm } from "../Forms/StudentForm/StudentForm";
import { ClassForm } from "../Forms/ClassForm/ClassForm";
import StudentPage from "../StudentPage";
import Content from "../Content/Content";
import NotFound from "../NotFound";
import QuestionnaireAnswerPage from "../../pages/QuestionnaireAnswerPage/QuestionnaireAnswerPage";
import TeacherPage from "../../pages/TeacherPage";
import GoalPage from "../GoalPage";

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
                  <Route path="teacher" element={<TeacherForm />} />
                  <Route path="teacher/:id" element={<TeacherForm />} />
                  <Route path="student/:id" element={<StudentForm />} />
                  <Route path="student" element={<StudentForm />} />
                  <Route path="class/:id" element={<ClassForm />} />
                  <Route path="class" element={<ClassForm />} />
                  <Route path="*" element={<AdminPage />} />
                </Route>
                <Route path="/" element={<MainPage />}>
                  <Route path="/" element={<Content />} />
                  <Route path="/feedback" element={<QuestionnairePage />} />
                  <Route
                    path="/feedback/:id"
                    element={<QuestionnaireAnswerPage />}
                  />
                  <Route path="/student/:id" element={<StudentPage />} />
                  <Route path="/teacher/:id" element={<TeacherPage />} />
                  <Route
                    path="/student/:studentId/goal"
                    element={<GoalPage />}
                  />
                  <Route
                    path="/student/:studentId/goal/:id"
                    element={<GoalPage />}
                  />
                  <Route path="/not-found" element={<NotFound />} />
                </Route>
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
