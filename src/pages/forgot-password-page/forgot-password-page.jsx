import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import { forgotPasswordRequest } from "../../services/resetPasswordSlice";

import loginStyles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const dispatch = useDispatch();

  const { loading, requestSuccess, message, error } = useAppSelector(
    (store) => store.resetPasswordSlice
  );


  const navigate = useNavigate();
  useEffect(() => {
    console.log(requestSuccess);
    if (requestSuccess) {
      console.log("email sent, go to reset password page");
      navigate("/reset-password")
    } else {
      console.log("email is not sent");
    }
  }, [requestSuccess]);

  const handleForgotPassword = () => dispatch(forgotPasswordRequest({email}));

  return (
    <div className={loginStyles.mainBlock}>
      <div className={loginStyles.upperBlock}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
        />
        <button onClick={handleForgotPassword}>Отправить</button>
      </div>
      {error ? <p>Ошибка: {error}</p> : null}
    </div>
  );
};

export default ForgotPasswordPage;
