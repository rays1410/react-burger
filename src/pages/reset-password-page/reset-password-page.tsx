import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
import Loader from "../../components/loader/loader";
import { resetPassword } from "../../services/resetPasswordSlice";
import { PATH_FORGOT_PASSWORD, PATH_LOGIN } from "../../utils/pageNames";
import { getResetPasswordSlice } from "../../utils/utils";

import resetPasswordStyles from "./reset-password.module.css";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [emailToken, setEmailToken] = useState("");
  const { state } = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { changeSuccess, userMessage, loading } = useAppSelector(
    getResetPasswordSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.from) {
      if (state.from !== PATH_FORGOT_PASSWORD) navigate(PATH_FORGOT_PASSWORD);
    } else {
      navigate(PATH_FORGOT_PASSWORD);
    }

    if (changeSuccess) {
      navigate(PATH_LOGIN);
    }
  }, [navigate, state, changeSuccess]);

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword({ newPassword, emailToken }));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={resetPasswordStyles.mainBlock}>
      <form
        onSubmit={(e) => handleResetPassword(e)}
        className={resetPasswordStyles.upperBlock}
      >
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <PasswordInput
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          name={"newPassword"}
          extraClass="mb-2"
          placeholder="Новый пароль"
        />
        <Input
          type={"text"}
          placeholder={"Код из письма"}
          onChange={(e) => setEmailToken(e.target.value)}
          value={emailToken}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive"}>
        {userMessage ? userMessage : null}
      </p>
    </div>
  );
};

export default ResetPasswordPage;
