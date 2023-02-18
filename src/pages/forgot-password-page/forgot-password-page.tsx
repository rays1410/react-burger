import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
import { forgotPassword } from "../../services/resetPasswordSlice";

import forgotPasswordStyles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const dispatch = useDispatch<AppDispatch>();

  const { loading, requestSuccess, userMessage } = useAppSelector(
    (store) => store.resetPasswordSlice
  );

  const navigate = useNavigate();
  useEffect(() => {
    console.log(requestSuccess);
    if (requestSuccess) {
      navigate("/reset-password");
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
            <Link className={forgotPasswordStyles.linkColor} to="/login">
              Войти
            </Link>
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>
            {userMessage ? userMessage : "kek"}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
