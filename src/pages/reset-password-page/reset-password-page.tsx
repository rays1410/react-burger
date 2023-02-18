import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../..";
import {
  resetPassword,
} from "../../services/resetPasswordSlice";
import { BASE_URL } from "../../utils/constants";

import resetPasswrodStyles from "./reset-password.module.css";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [emailToken, setEmailToken] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { changeSuccess, userMessage  } = useAppSelector(
    (store) => store.resetPasswordSlice
  );

  const handleResetPassword = () =>
    dispatch(resetPassword({ newPassword, emailToken }));

  const navigate = useNavigate();
  useEffect(() => {
    if (changeSuccess) {
      navigate("/");
    } else {
    }
  }, [changeSuccess]);

  return (
    <div className={resetPasswrodStyles.mainBlock}>
      <div className={resetPasswrodStyles.upperBlock}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
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
        <Button
          onClick={() => handleResetPassword()}
          htmlType="button"
          type="primary"
          size="large"
        >
          Восстановить
        </Button>
      </div>
      <p className={"text text_type_main-default text_color_inactive"}>
        {userMessage ? userMessage : "kek"}
      </p>
    </div>
  );
};

export default ResetPasswordPage;
