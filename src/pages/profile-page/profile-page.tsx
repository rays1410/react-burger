import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
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
  changeUserData,
  clearUser,
  getNewAccessToken,
  userLogout,
} from "../../services/authSlice";
import {
  PATH_ADD_ORDERS,
  PATH_HOME,
  PATH_PROFILE,
} from "../../utils/pageNames";
import { useEffect } from "react";
import { getAuthSlice } from "../../utils/utils";

const ProfilePage = () => {
  const activeClassName = `${profileStyles.disabledLink} text text_type_main-medium`;

  const disabledClassName = `text text_type_main-medium`;
  const { userInfo, userMessage, isUserLogged } = useAppSelector(getAuthSlice);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isDataChanged =
    name !== userInfo.name || email !== userInfo.email || password.length !== 0;

  const activeButtonClass = isDataChanged
    ? profileStyles.profileButton
    : profileStyles.hiddenButtons;

  const saveHandler = () => {
    dispatch(changeUserData({ email, name, password }))
      .unwrap()
      .catch(() => {
        dispatch(getNewAccessToken())
          .unwrap()
          .then(() => dispatch(changeUserData({ email, name, password })))
          .catch(() => dispatch(clearUser()));
      });
  };

  const cancelHandler = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
  };

  useEffect(() => {
    if (!isUserLogged) {
      navigate(PATH_PROFILE);
    }
  }, [navigate, isUserLogged]);

  const handleLogout = () => {
    dispatch(userLogout())
      .unwrap()
      .catch(() => {
        dispatch(clearUser());
      });
  };

  return (
    <div className={profileStyles.mainBlock}>
      <div className={profileStyles.content}>
        <div className={profileStyles.leftBlock}>
          <nav className={profileStyles.navMenu}>
            <NavLink
              to={PATH_PROFILE}
              className={({ isActive }) =>
                isActive ? activeClassName : disabledClassName
              }
              end
            >
              Профиль
            </NavLink>
            <NavLink
              to={PATH_ADD_ORDERS}
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
              onClick={handleLogout}
              to={PATH_HOME}
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
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"login"}
            size={"default"}
            extraClass="ml-1"
          />
          <PasswordInput
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
            {userMessage ? userMessage : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
