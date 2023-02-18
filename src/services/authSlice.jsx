import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN_NAME,
  BASE_URL,
  ERR_ACCESS_TOKEN_EXPIRED,
  ERR_ACCESS_TOKEN_ISNT_UPDATED,
  ERR_ACCESS_TOKEN_UNDEFINED,
  ERR_SERVER,
  ERR_UNKNOWN,
  ERR_USER_DATA_ISNT_UPDATED,
  ERR_USER_LOGIN,
  ERR_USER_LOGOUT,
  ERR_USER_REGISTRATION,
  REFRESH_TOKEN_NAME,
  SUCC_LOGIN,
  SUCC_REGISTRATION,
  SUCC_USER_DATA_UPDATE,
  SUCC_USER_LOGOUT,
} from "../utils/constants";
import { registerUser } from "../utils/utils";
import { ERR_USER_ALREADY_EXIST } from "../utils/constants";
import { getCookie, setCookie, deleteCookie } from "../utils/cookieUtils";
import {
  accessTokenRequest,
  changeUserDataRequest,
  checkAuthRequest,
  userLoginRequest,
  userLogoutRequest,
  userRegisterRequest,
} from "../utils/authUtils";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await userRegisterRequest(name, email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_REGISTRATION);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await userLoginRequest(email, password);
      console.log(data);

      return data;
    } catch (error) {
      console.log("catch thunk");
      return thunkAPI.rejectWithValue(ERR_USER_LOGIN);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    const refreshToken = getCookie(REFRESH_TOKEN_NAME);
    try {
      console.log(refreshToken);
      const { data } = await userLogoutRequest(refreshToken);
      console.log(data);

      return data;
    } catch (error) {
      console.log("logout err");
      return thunkAPI.rejectWithValue(ERR_USER_LOGOUT);
    }
  }
);

export const changeUserData = createAsyncThunk(
  "auth/changeUserData",
  async ({ email, name, password }, thunkAPI) => {
    console.log("ya tut");
    try {
      const accessToken = getCookie(ACCESS_TOKEN_NAME);
      const { data } = await changeUserDataRequest(
        accessToken,
        email,
        name,
        password
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_DATA_ISNT_UPDATED);
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async (_, thunkAPI) => {
    const refreshToken = getCookie(REFRESH_TOKEN_NAME);
    try {
      const { data } = await accessTokenRequest(refreshToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_ACCESS_TOKEN_ISNT_UPDATED);
    }
  },
  {
    condition: () => {
      const refreshToken = getCookie(REFRESH_TOKEN_NAME);
      if (!refreshToken) {
        return false; // нет рефреш токена, значит не идем за акссесом
      }
    },
  }
);

export const checkUserAuth = createAsyncThunk(
  "auth/checkUserAuth",
  async (_, thunkAPI) => {
    const accessToken = getCookie(ACCESS_TOKEN_NAME);
    if (accessToken) {
      console.log("аксес есть, делаем запрос");
      try {
        const { data } = await checkAuthRequest(accessToken);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    } else {
      return thunkAPI.rejectWithValue(ERR_ACCESS_TOKEN_UNDEFINED);
    }
  }
);

const initialState = {
  isAuthChecked: false,
  isUserLogged: false,
  loading: false,
  userInfo: null,
  userMessage: null,
  devError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userDelete: (state) => {
      state.userInfo = null;
      state.isAuthChecked = false;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: {
    // Обработка регистрации
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_REGISTRATION;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userMessage = ERR_USER_REGISTRATION;
      state.devError = payload;
    },

    // Обработка логина
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      state.userInfo = payload.user;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_LOGIN;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userMessage = ERR_USER_LOGIN;
      state.devError = payload;
    },

    // Изменение данных юзера
    [changeUserData.pending]: (state) => {
      state.loading = true;
    },
    [changeUserData.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.loading = false;
      state.userMessage = SUCC_USER_DATA_UPDATE;
      state.devError = null;
    },
    [changeUserData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.devError = payload;
      state.userMessage = ERR_USER_DATA_ISNT_UPDATED;
    },

    // Логаут
    [userLogout.pending]: (state) => {
      state.loading = true;
    },
    [userLogout.fulfilled]: (state) => {
      state.userInfo = null;
      state.isAuthChecked = true; // #
      state.isUserLogged = false;
      state.loading = false;
      state.userMessage = SUCC_USER_LOGOUT;
      state.devError = null;
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
    },
    [userLogout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.devError = payload;
      state.userMessage = ERR_USER_LOGOUT;
    },

    // Новые токены
    [getNewAccessToken.pending]: (state) => {
      state.loading = true;
    },
    [getNewAccessToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [getNewAccessToken.rejected]: (state) => {
      state.loading = false;
      state.devError = ERR_SERVER;
      state.userMessage = ERR_SERVER;
    },

    // Проверка auth
    [checkUserAuth.pending]: (state) => {
      state.loading = true;
    },
    [checkUserAuth.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
    },
    [checkUserAuth.rejected]: (state, { payload }) => {
      state.isAuthChecked = true;
      state.loading = false;
      state.devError = payload;
      state.userError = null;
      state.devError = ERR_ACCESS_TOKEN_UNDEFINED;
    },
  },
});

export const {
  storeRefreshToken,
  authChecked,
  jwtExpired,
  userDelete,
  toggleLoading,
} = authSlice.actions;

export default authSlice.reducer;
