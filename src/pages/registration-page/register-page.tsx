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
import { PATH_LOGIN, PATH_PROFILE } from "../../utils/pageNames";
import Loader from "../../components/loader/loader";
import { getAuthSlice } from "../../utils/utils";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isUserLogged, userMessage, loading } = useAppSelector(getAuthSlice);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogged) {
      navigate(PATH_PROFILE);
    }
  }, [navigate, isUserLogged]);

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userRegister({ email, password, name }));
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className={registerStyles.mainBlock}>
        <form
          onSubmit={(e) => handleRegistration(e)}
          className={registerStyles.upperBlock}
        >
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
            placeholder={"E-mail"}
            isIcon={false}
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={"Пароль"}
            name={"password"}
            extraClass="mb-2"
          />
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>
        <div className={registerStyles.lowerBlock}>
          <span className="text text_type_main-default">
            <p className="text_color_inactive">
              Уже зарегистрированы?{" "}
              <Link className={registerStyles.linkColor} to={PATH_LOGIN}>
                Войти
              </Link>
            </p>
            {userMessage ? <p>{userMessage}</p> : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
