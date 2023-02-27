import { IUserBaseData } from "./interfaces";

export type TBunPosition = "top" | "bottom";

export type TAuthRequest = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TRequestAnswer = {
  success: boolean;
  message: string;
};

export type TGetUserInfo = {
  success: boolean;
  user: TUserOpenData;
};

export type TUserLogin = Omit<IUserBaseData, "name">;
export type TUserOpenData = Omit<IUserBaseData, "password">;
