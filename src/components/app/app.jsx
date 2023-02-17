import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientSlice";
import { AppDispatch, useAppSelector } from "../..";
import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/registration-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import OrderPage from "../../pages/order-page/order-page";
import EditProfilePage from "../../pages/edit-profile-page/edit-profile-page";
import ProtectedRoute from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import { checkUserAuth, getNewAccessToken } from "../../services/authSlice";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import Modal from "../modal/modal";
import useToggle from "../../hooks/useToggle";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const router = (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route exact path="/" element={<HomePage />} />
        <Route path="ingredients/:id" element={<IngredientPage />} />
      </Routes>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {background && (
          <Route
            path="ingredients/:id"
            element={
              <Modal header={"Детали ингредиента"} onClosedModal={() => navigate("/")}>
                <IngredientPage />
              </Modal>
            }
          />
        )}
      </Routes>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute redirectTo={"/login"} onlyUnAuth={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );

  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  // const dataStatus = useSelector((state: any) => state.ingredients.status);
  const dataStatus = useSelector((state) => state.ingredients.status);

  const {
    userInfo,
    userAccessToken,
    userRefreshToken,
    isAccessTokenValid,
    loading,
  } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (dataStatus === "idle") dispatch(fetchIngredients());

    if (!userInfo) {
      console.log("пользователь не найден, делаю запрос...");
      dispatch(checkUserAuth({ accessToken: userAccessToken }));
    }

    if (!isAccessTokenValid && userRefreshToken) {
      dispatch(getNewAccessToken({ refreshToken: userRefreshToken }));
    }
  }, [isAccessTokenValid, userRefreshToken]);

  return dataStatus === "succeeded" ? router : <div>Loading...</div>;
}

export default App;
