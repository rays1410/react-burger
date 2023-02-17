import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import {
  storeRefreshToken,
  getUserData,
  getNewAccessToken,
  authChecked,
  checkUserAuth,
} from "../../services/authSlice";
import { getCookie } from "../../utils/cookieUtils";

export default function ProtectedRoute({ onlyUnAuth = false, redirectTo, children }) {
  const location = useLocation();

  const { isAuthChecked, userInfo } = useAppSelector((state) => state.authSlice);

  if (!isAuthChecked) {
    console.log("загрузка...");
    return <div>Loading...</div>;
  }

  if (onlyUnAuth && userInfo) {
    console.log("уже авторизован, редирект на гл страницу");
    return <Navigate to={'/'} state={{ from: location }} />;
  }

  if (!onlyUnAuth && !userInfo) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
}
