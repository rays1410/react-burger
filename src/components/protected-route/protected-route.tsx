import { useLocation, Navigate} from "react-router-dom";
import { useAppSelector } from "../..";
import { ProtectedRouteTypes } from "../../utils/interfaces";
import { PATH_PROFILE } from "../../utils/pageNames";
import { getAuthSlice } from "../../utils/utils";

export default function ProtectedRoute({
  onlyUnAuth = false,
  redirectTo,
  children,
}: ProtectedRouteTypes) {
  const location = useLocation();

  const { isAuthChecked, isUserData } = useAppSelector(getAuthSlice);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (onlyUnAuth && isUserData) {
    return <Navigate to={PATH_PROFILE} state={{ from: location }} />;
  }

  if (!onlyUnAuth && !isUserData) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
}
