import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientSlice";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/registration-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRoute from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import { checkUserAuth, getNewAccessToken } from "../../services/authSlice";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import Modal from "../modal/modal";
import { getCookie } from "../../utils/cookieUtils";
import {
  ERR_ACCESS_TOKEN_EXPIRED,
  ERR_ACCESS_TOKEN_UNDEFINED,
} from "../../utils/statusConstants";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { AppDispatch, useAppSelector } from "../..";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const router = (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="ingredients/:id" element={<IngredientPage />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path="ingredients/:id"
            element={
              <Modal
                header={"Детали ингредиента"}
                onClosedModal={() => navigate("/")}
              >
                <IngredientDetails />
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
            <ProtectedRoute redirectTo={"/"} onlyUnAuth={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectTo={"/"} onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute redirectTo={"/"} onlyUnAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute redirectTo={"/"} onlyUnAuth={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute redirectTo={"/login"} onlyUnAuth={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path=":orders"></Route>
        </Route>
      </Routes>
    </>
  );

  const dispatch = useDispatch<AppDispatch>();
  // const dispatch = useDispatch();
  // const dataStatus = useSelector((state: any) => state.ingredients.status);
  const dataStatus = useAppSelector((state) => state.ingredients.status);

  const { isUserData, loading } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    // Тянем ингредиенты
    if (dataStatus === "idle") dispatch(fetchIngredients());

    // Диспатчим auth проверку, если thunk выдаст ошибку запроса,
    // то проверяем является ли эта ошибка следствием протухшего
    // аксес токена и, если это она, запрашиваем новый токен
    // А потом снова запрашиваем auth
    if (!isUserData) {
      dispatch(checkUserAuth())
        .unwrap()
        .catch((error) => {
          if (
            error === ERR_ACCESS_TOKEN_EXPIRED ||
            error === ERR_ACCESS_TOKEN_UNDEFINED
          ) {
            dispatch(getNewAccessToken())
              .unwrap()
              .then(() => dispatch(checkUserAuth()))
              .catch((error) => {});
          }
        });
    }
  }, []);

  return dataStatus === "succeeded" && !loading ? (
    router
  ) : (
    <div>Loading...</div>
  );
}

export default App;
