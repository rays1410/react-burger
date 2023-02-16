import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../..";
import {
  storeRefreshToken,
  getUserData,
  getNewAccessToken,
  authChecked,
  checkUserAuth,
} from "../../services/authSlice";
import { getCookie } from "../../utils/cookieUtils";

export default function RequiredAuth({ redirectTo, children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    userInfo,
    userAccessToken,
    userRefreshToken,
    isAccessTokenValid,
    isAuthChecked,
    loading,
    isUserLogged,
    error,
  } = useAppSelector((state) => state.authSlice);

  // const userRefreshToken = getCookie("refreshToken");
  // useEffect(() => {
  //   if (!isAuthChecked) {
  //     console.log("render");
  //     dispatch(authChecked());
  //     if (userRefreshToken && !isAccessTokenValid) {
  //       console.log(
  //         "Обнаружен рефреш токен, аксесс протух (или его нет), идём за новым..."
  //       );
  //       dispatch(getNewAccessToken({ refreshToken: userRefreshToken }));
  //     }
  //     // if (isAccessTokenValid) {
  //     //   console.log("Аксес живой, фетчим дату в юзффекте...");
  //     //   dispatch(getUserData({ token: userAccessToken }));
  //     // }
  //   }
  // }, []);
  // if (!userRefreshToken && !isAuthChecked) {
  //   console.log("Нет ничего даже рефреш токена, идем на логин...");
  //   return <Navigate to={"/login"} state={{ from: location }} />;
  // }

  useEffect(() => {
    if (!userInfo && !loading && !isUserLogged) {
      dispatch(checkUserAuth({ accessToken: userAccessToken }))
    }

    if (!isAccessTokenValid && userRefreshToken) {
      dispatch(getNewAccessToken({ refreshToken: userRefreshToken }));
    }
  }, [dispatch]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
}
