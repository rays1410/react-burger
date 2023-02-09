import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientSlice";
import { AppDispatch } from "../..";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/registration-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const dataStatus = useSelector((state: any) => state.ingredients.status);

  useEffect(() => {
    if (dataStatus === "idle") dispatch(fetchIngredients());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
