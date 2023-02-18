import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./register.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../..";

const RegisterPage = () => {
  const [name, setName] = useState("andrey");
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const [password, setPassword] = useState("password");

  const { loading, userInfo, userMessage, isAuthChecked } = useAppSelector(
    (state) => state.authSlice
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegistration = () => {
    dispatch(userRegister({ email, password, name }));
  };

  return loading ? (
    <div>{"Loading..."}</div>
  ) : (
    <>
      <div className={registerStyles.mainBlock}>
        <div className={registerStyles.upperBlock}>
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
          <Button
            onClick={handleRegistration}
            htmlType="button"
            type="primary"
            size="large"
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={registerStyles.lowerBlock}>
          <span className="text text_type_main-default">
            <p className="text_color_inactive">
              Уже зарегистрированы?{" "}
              <Link className={registerStyles.linkColor} to="/login">
                Войти
              </Link>
            </p>
            {userMessage ? <p>Ошибка: {userMessage}</p> : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
