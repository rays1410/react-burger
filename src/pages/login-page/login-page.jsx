import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import loginStyles from "./login.module.css";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { loginUser } from "../../utils/utils";

const LoginPage = () => {
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const [password, setPassword] = useState("password");
  const handleLogin = async () => {
    const res = await loginUser(BASE_URL + "/auth/login", email, password);
    console.log(res);
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
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
        <button onClick={handleLogin}>Войти</button>
      </div>

      <div className={loginStyles.lowerBlock}>
        <span className="text text_type_main-small">
          Зарегистрироваться
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
      </div>
    </div>
  );
};

export default LoginPage;
