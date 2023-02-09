import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../utils/utils";
import { BASE_URL } from "../../utils/constants";

const RegisterPage = () => {
  const [name, setName] = useState("andrey");
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const [password, setPassword] = useState("password");

  const handleRegistration = () => {
    const res = registerUser(
      BASE_URL + "/auth/register",
      email,
      password,
      name
    );
  };

  return (
    <div className={loginStyles.mainBlock}>
      <div className={loginStyles.upperBlock}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
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
        <button onClick={handleRegistration}>Зарегистрироваться</button>
      </div>

      <div className={loginStyles.lowerBlock}>
        <span className="text text_type_main-small">
          <p>
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
