import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { useAppSelector } from "../..";
import { sendForgotPasswordRequest } from "../../services/forgotPasswordSlice";
import { BASE_URL } from "../../utils/constants";
import { forgotPasswordRequest } from "../../utils/utils";

import loginStyles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("dreyz@yandex.ru");
  const dispatch = useDispatch();
  const { requestStatus } = useAppSelector((store) =>
    store.forgotPasswordSlice
  );
  const navigate = useNavigate();
  useEffect(() => {
    console.log(requestStatus);
    if (requestStatus === 'succeeded') {
      console.log('go')
      navigate("/reset-password");
    }
  }, [requestStatus]);

  const handleForgotPassword = () => dispatch(sendForgotPasswordRequest(email));

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
    </div>
  );
};

export default ForgotPasswordPage;
