import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import profileStyles from "./profile.module.css";
import { useState } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  userDelete,
  changeUserData,
  userLogout,
} from "../../services/authSlice";

const ProfilePage = () => {
  const activeClassName = `${profileStyles.disabledLink} text text_type_main-medium`;

  const disabledClassName = `text text_type_main-medium`;
  const { userInfo, userMessage, loading } = useAppSelector(
    (state) => state.authSlice
  );

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDataChanged =
    name !== userInfo.name || email !== userInfo.email || password.length !== 0;

  const activeButtonClass = isDataChanged
    ? profileStyles.profileButton
    : profileStyles.hiddenButtons;

  const saveHandler = () => {
    dispatch(changeUserData({ email, name, password })).unwrap();
  };

  const cancelHandler = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(userLogout())
      .unwrap()
      .then(() => navigate("/"));
  };

  return loading ? (
    <div>{"Loading"}</div>
  ) : (
    <div className={profileStyles.mainBlock}>
      <div className={profileStyles.content}>
        <div className={profileStyles.leftBlock}>
          <nav className={profileStyles.navMenu}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? activeClassName : disabledClassName
              }
              end
            >
              Профиль
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? activeClassName : disabledClassName
              }
              end
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
              to={'/'}
              end
            >
              Выход
            </NavLink>
          </nav>
          <p className={"text text_type_main-default text_color_inactive"}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={profileStyles.rightBlock}>
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

          <div className={profileStyles.buttons}>
            <Button
              onClick={saveHandler}
              extraClass={activeButtonClass}
              htmlType="button"
              type="primary"
              size="large"
            >
              Сохранить
            </Button>
            <Button
              onClick={cancelHandler}
              extraClass={activeButtonClass}
              htmlType="button"
              type="primary"
              size="large"
            >
              Отмена
            </Button>
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            {userMessage ? userMessage : "kek"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
