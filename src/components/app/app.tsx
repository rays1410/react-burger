import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientSlice";
import { AppDispatch } from "../..";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/registration-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import OrderPage from "../../pages/order-page/order-page";
import EditProfilePage from "../../pages/edit-profile-page/edit-profile-page";
import RequiredAuth from "../required-auth/required-auth";
import AppHeader from "../app-header/app-header";

const router = (
  <>
    <AppHeader />
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <RequiredAuth redirectTo={"/login"}>
            <ProfilePage />
          </RequiredAuth>
        }
      />
      <Route path="register" element={<RegisterPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  </>
);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const dataStatus = useSelector((state: any) => state.ingredients.status);
  

  useEffect(() => {
    if (dataStatus === "idle") dispatch(fetchIngredients());
  }, [dispatch]);

  return router;
}

export default App;
