import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
import { clearUserMessage } from "../../services/authSlice";
import { forgotPassword } from "../../services/resetPasswordSlice";
import { PATH_LOGIN, PATH_RESET_PASSWORD } from "../../utils/pageNames";

import forgotPasswordStyles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { requestSuccess, userMessage } = useAppSelector(
    (store) => store.resetPasswordSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (requestSuccess) {
      navigate(PATH_RESET_PASSWORD);
    }
  }, [requestSuccess]);

  const handleForgotPassword = () => dispatch(forgotPassword(email));

  return (
    <div className={forgotPasswordStyles.mainBlock}>
      <div className={forgotPasswordStyles.upperBlock}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
        />
        <Button
          onClick={() => handleForgotPassword()}
          htmlType="button"
          type="primary"
          size="large"
        >
          Восстановить
        </Button>
      </div>
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
