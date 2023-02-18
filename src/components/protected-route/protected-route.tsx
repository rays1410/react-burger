import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import { getCookie } from "../../utils/cookieUtils";
import { ProtectedRouteTypes } from "../../utils/interfaces";

export default function ProtectedRoute({
  onlyUnAuth = false,
  redirectTo,
  children,
}: ProtectedRouteTypes) {
  const location = useLocation();

  const { isAuthChecked, isUserData } = useAppSelector(
    (state) => state.authSlice
  );

  if (!isAuthChecked) {
    console.log("загрузка...");
    return <div>Loading...</div>;
  }

  if (onlyUnAuth && isUserData) {
    console.log("уже авторизован, редирект на гл страницу");
    return <Navigate to={"/profile"} state={{ from: location }} />;
  }

  if (!onlyUnAuth && !isUserData) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
}
