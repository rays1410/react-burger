import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import { resetPasswordRequest } from "../../services/resetPasswordSlice";
import { BASE_URL } from "../../utils/constants";

import resetPasswrodStyles from "./reset-password.module.css";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [emailToken, setEmailToken] = useState("");

  const dispatch = useDispatch();
  const { loading, changeSuccess, message, error } = useAppSelector(
    (store) => store.resetPasswordSlice
  );

  const handleResetPassword = () =>
    dispatch(resetPasswordRequest({ newPassword, emailToken }));

  const navigate = useNavigate();
  useEffect(() => {
    console.log(changeSuccess);
    if (changeSuccess) {
      console.log("password changed, go to main page");
      // navigate("/")
    } else {
      console.log("password is not changed");
    }
  }, [changeSuccess]);

  return (
    <div className={resetPasswrodStyles.mainBlock}>
      <div className={resetPasswrodStyles.upperBlock}>
        <p className="text text_type_main-medium">Задайте новый пароль</p>
        <PasswordInput
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          name={"newPassword"}
          extraClass="mb-2"
          placeholder="Новый пароль"
        />
        <Input
          type={"text"}
          placeholder={"Код из письма"}
          onChange={(e) => setEmailToken(e.target.value)}
          value={emailToken}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />

        <button onClick={handleResetPassword}>Сохранить</button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
