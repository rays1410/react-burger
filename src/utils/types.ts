export type TBunPosition = "top" | "bottom";
export type TBaseUserInfo = {
  email: string;
  name: string;
};

export type TAuthRequest = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutRequest = {
  success: boolean;
  message: string;
};

export type TChangeUserDataRequest = {
  success: boolean;
  user: TBaseUserInfo;
};

export type TGetUserInfo = {
  success: boolean;
  user: TBaseUserInfo;
};

export type TForgotResetRequest = {
  success: boolean;
  message: string;
};
