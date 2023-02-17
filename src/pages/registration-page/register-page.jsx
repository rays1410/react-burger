import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./register.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../services/authSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../..";

const RegisterPage = () => {
  const [name, setName] = useState("andrey");
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const [password, setPassword] = useState("password");

  const { loading, userInfo, error, isAuthChecked } = useAppSelector(
    (state) => state.authSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = () => {
    dispatch(registerRequest({ email, password, name }));
  };

  return loading ? (
    <div>{"Loading..."}</div>
  ) : (
    <>
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
          <button type="submit" disabled={loading} onClick={handleRegistration}>
            {loading ? "Loading..." : "Зарегистрироваться"}
          </button>
        </div>
      </div>

      <div className={loginStyles.lowerBlock}>
        <span className="text text_type_main-small">
          <p>
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
          {error ? <p>Ошибка: {error}</p> : null}
        </span>
      </div>
    </>
  );
};

export default RegisterPage;
