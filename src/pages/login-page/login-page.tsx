import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { loginUser } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/authSlice";
import { AppDispatch, useAppSelector } from "../..";

const LoginPage = () => {
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const [password, setPassword] = useState("password11");
  const { userInfo, loading, userMessage } = useAppSelector(
    (state) => state.authSlice
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(userLogin({ email, password }))
      .unwrap()
      .then(() => {
        if (userInfo) {
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <div>{"Loading"}</div>
  ) : (
    <div className={loginStyles.mainBlock}>
      <div className={loginStyles.upperBlock}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
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
        <span className="text text_type_main-small">
          <p>
            Вы — новый пользователь?{" "}
            <Link to="/register">Зарегистрироваться</Link>
          </p>
        </span>
        <span className="text text_type_main-small">
          <p>
            Забыли пароль?{" "}
            <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
        </span>

        {userMessage ? <p>{userMessage}</p> : null}
      </div>
    </div>
  );
};

export default LoginPage;
