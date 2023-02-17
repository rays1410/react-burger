import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../..";
import { getCookie } from "../../utils/cookieUtils";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  userDelete,
  changeUserData,
  logoutRequest,
} from "../../services/authSlice";

const ProfilePage = () => {
  const activeClassName = `${styles.disabledLink} text text_type_main-medium`;
  const disabledClassName = `text text_type_main-medium`;
  const { userInfo, userAccessToken, userRefreshToken, loading } =
    useAppSelector((state) => state.authSlice);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isDataChanged =
    name !== userInfo.name || email !== userInfo.email || password.length !== 0;

  const saveHandler = () => {
    dispatch(changeUserData({ token: userAccessToken, email, name, password }));
  };

  const cancelHandler = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("kek");
    dispatch(logoutRequest({ token: userRefreshToken }));
  };

  return loading ? (
    <div>{"Loading"}</div>
  ) : (
    <div className={styles.mainBlock}>
      <div className={styles.leftBlock}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? activeClassName : disabledClassName
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            isActive ? activeClassName : disabledClassName
          }
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? activeClassName : disabledClassName
          }
          onClick={(e) => {
            handleLogout(e);
          }}
        >
          Выход
        </NavLink>
      </div>
      <div className={styles.rightBlock}>
        <Input
          type={"text"}
          placeholder={"Имя "}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
        <EmailInput
          type={"text"}
          placeholder={"Логин"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"login"}
          size={"default"}
          extraClass="ml-1"
        />
        <PasswordInput
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          size={"default"}
          extraClass="ml-1"
        />

        <button onClick={() => dispatch(userDelete())}>проверка</button>

        {isDataChanged ? (
          <>
            <button onClick={saveHandler}>Сохранить</button>
            <button onClick={cancelHandler}>Отмена</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
