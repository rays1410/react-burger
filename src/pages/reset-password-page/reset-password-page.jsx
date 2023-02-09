import {
  Input, PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { resetPasswordRequest } from "../../utils/utils";

import resetPasswrodStyles from "./reset-password.module.css";
const ResetPasswordPage = () => {

  const [newPassword, setNewPassword] = useState("");
  const [emailToken, setEmailToken] = useState("")

  const handleResetPassword = () => {
    const res = resetPasswordRequest(BASE_URL + "/password-reset",  newPassword);
    return res;
  }
  
  return (
    <div className={resetPasswrodStyles.mainBlock}>
      <div className={resetPasswrodStyles.upperBlock}>
        <p className="text text_type_main-medium">Задайте новый пароль</p>
        <PasswordInput
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          name={"newPassword"}
          extraClass="mb-2"
          placeholder="Новый праоль"
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
