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

export const App: React.FC = ({}) => {
  return (
    <AuthProvider>
        <div className={Style.app}>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                backgroundColor: "#1f1f1f",
                color: 'white'
              },
            }}
          />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<MainPage />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </SelectedClassContextProvider>
    </AuthProvider>
  );
};

export default App;
