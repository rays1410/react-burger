import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUserMessage, userLogin } from "../../services/authSlice";
import { AppDispatch, useAppSelector } from "../..";
import { PATH_FORGOT_PASSWORD, PATH_PROFILE, PATH_REGISTER } from "../../utils/pageNames";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, userMessage } = useAppSelector((state) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(clearUserMessage());
    dispatch(userLogin({ email, password }))
      .unwrap()
      .then(() => {
        if (userInfo) {
          navigate(PATH_PROFILE);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={loginStyles.mainBlock}>
      <div className={loginStyles.upperBlock}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder={'E-mail'}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
        <Button
          onClick={handleLogin}
          htmlType="button"
          type="primary"
          size="large"
        >
          Войти
        </Button>
      </div>

      <div className={loginStyles.lowerBlock}>
        <span>
          <p className={"text text_type_main-default text_color_inactive"}>
            Вы — новый пользователь?{" "}
            <Link className={loginStyles.linkColor} to={PATH_REGISTER}>
              Зарегистрироваться
            </Link>
          </p>
        </span>
        <span>
          <p className={"text text_type_main-default text_color_inactive"}>
            Забыли пароль?{" "}
            <Link className={loginStyles.linkColor} to={PATH_FORGOT_PASSWORD}>
              Восстановить пароль
            </Link>
          </p>
        </span>

        {userMessage ? (
          <p className={"text text_type_main-default"}>{userMessage}</p>
        ) : null}
      </div>
    </div>
  );
};

export default LoginPage;
