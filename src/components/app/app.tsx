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
import ErrorPage from "../../pages/error-page/error-page";
import {
  PATH_ADD_ORDERS,
  PATH_ERR,
  PATH_FORGOT_PASSWORD,
  PATH_HOME,
  PATH_INGREDIENTS_ID,
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_REGISTER,
  PATH_RESET_PASSWORD,
} from "../../utils/pageNames";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const router = (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route path={PATH_INGREDIENTS_ID} element={<IngredientPage />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path={PATH_INGREDIENTS_ID}
            element={
              <Modal
                header={"Детали ингредиента"}
                onClosedModal={() => navigate(PATH_HOME)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </Routes>

      <Routes>
        <Route path={PATH_HOME} element={<HomePage />} />
        <Route path={PATH_ERR} element={<ErrorPage />} />
        <Route
          path={PATH_REGISTER}
          element={
            <ProtectedRoute redirectTo={PATH_HOME} onlyUnAuth={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_LOGIN}
          element={
            <ProtectedRoute redirectTo={PATH_HOME} onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_RESET_PASSWORD}
          element={
            <ProtectedRoute redirectTo={PATH_HOME} onlyUnAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_FORGOT_PASSWORD}
          element={
            <ProtectedRoute redirectTo={PATH_HOME} onlyUnAuth={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH_PROFILE}
          element={
            <ProtectedRoute redirectTo={PATH_LOGIN} onlyUnAuth={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path={PATH_ADD_ORDERS}></Route>
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

  return router;

}

export default App;
