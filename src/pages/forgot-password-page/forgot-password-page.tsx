import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
import Loader from "../../components/loader/loader";
import { forgotPassword } from "../../services/resetPasswordSlice";
import {
  PATH_FORGOT_PASSWORD,
  PATH_LOGIN,
  PATH_RESET_PASSWORD,
} from "../../utils/pageNames";
import { getResetPasswordSlice } from "../../utils/utils";

import forgotPasswordStyles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { requestSuccess, userMessage, loading } = useAppSelector(
    getResetPasswordSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (requestSuccess) {
      navigate(PATH_RESET_PASSWORD, { state: { from: PATH_FORGOT_PASSWORD } });
    }
  }, [requestSuccess]);

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={forgotPasswordStyles.mainBlock}>
      <form
        onSubmit={(e) => handleForgotPassword(e)}
        className={forgotPasswordStyles.upperBlock}
      >
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </form>
      <div className={forgotPasswordStyles.lowerBlock}>
        <span className="text text_type_main-default">
          <p className="text_color_inactive">
            Вспомнили пароль?{" "}
            <Link className={forgotPasswordStyles.linkColor} to={PATH_LOGIN}>
              Войти
            </Link>
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {userMessage ? userMessage : null}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
