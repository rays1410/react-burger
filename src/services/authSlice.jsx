import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { BASE_URL, ERR_UNKNOWN } from "../utils/constants";
import { registerUser } from "../utils/utils";
import axios from "axios";
import { ERR_USER_ALREADY_EXIST } from "../utils/constants";
import {
  getCookie,
  setCookie,
  deleteCookie,
  eraseCookie,
} from "../utils/cookieUtils";

const getRefreshToken = () => {
  const token = getCookie("refreshToken");
  return token ? token : null;
};

const initialState = {
  userInfo: null,
  userAccessToken: null,
  userRefreshToken: getRefreshToken(),
  error: null,
  isAccessTokenValid: false,
  isAuthChecked: false,
  isUserLogged: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    jwtExpired: (state) => {
      state.isAccessTokenValid = false;
    },
    userDelete: (state) => {
      state.userInfo = null;
      state.isAuthChecked = false;
    },
  },
  extraReducers(builder) {
    builder
      // registration
      .addCase(registerRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerRequest.fulfilled, (state, { payload }) => {
        state.userAccessToken = payload.accessToken;
        state.userInfo = payload.user;
        state.isAccessTokenValid = true;
        state.isAuthChecked = true;
        state.isUserLogged = true;
        setCookie("refreshToken", payload.refreshToken);
        state.loading = false;
      })
      .addCase(registerRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // login
      .addCase(loginRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        state.userAccessToken = payload.accessToken;
        state.userInfo = payload.user;
        state.isAccessTokenValid = true;
        state.isAuthChecked = true;
        state.isUserLogged = true;

        setCookie("refreshToken", payload.refreshToken);
        state.loading = false;
      })
      .addCase(loginRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // new token
      .addCase(getNewAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewAccessToken.fulfilled, (state, { payload }) => {
        state.userAccessToken = payload.accessToken;
        state.isAccessTokenValid = true;
        state.isAuthChecked = false;
        state.loading = false;
        deleteCookie("refreshToken");
        setCookie("refreshToken", payload.refreshToken);
      })
      .addCase(getNewAccessToken.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // check user auth
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
        state.userInfo = payload.user;
        state.isUserLogged = true;
        state.loading = false;
      })
      .addCase(checkUserAuth.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // change user data
      .addCase(changeUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        console.log("norm, novie dannie ", payload.user);
        state.userInfo = payload.user;
        state.loading = false;
      })
      .addCase(changeUserData.rejected, (state, { payload }) => {
        console.log("oshibka ", payload);
        state.error = payload;
        state.loading = false;
      });
  },
});

export const registerRequest = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/register`, {
        email: email,
        password: password,
        name: name,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const changeUserData = createAsyncThunk(
  "auth/changeUserData",
  async ({ token, email, name, password }, { rejectWithValue }) => {
    try {
      console.log(token, email, name, password);
      const tsttoken = getCookie("refreshToken");
      const { data } = await axios.patch(
        `${BASE_URL}/auth/user`,
        {
          email,
          name,
          password,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async ({ refreshToken }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/token`, {
        token: refreshToken,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("rejected аксес токен не обновлен");
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  "auth/checkUserAuth",
  async ({ accessToken }, thunkAPI) => {
    if (accessToken) {
      try {
        // console.log(`пытаюсь поулчить юзера по токену Bearer ${token}`);
        const { data } = await axios.get(`${BASE_URL}/auth/user`, {
          headers: {
            "Content-type": "application/json",
            Authorization: accessToken,
          },
        });

        return data;
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          thunkAPI.isAccessTokenValid = false;
        }
        return thunkAPI.rejectWithValue(error.response.data.message);
      } finally {
        thunkAPI.dispatch(authChecked());
      }
    } else {
      thunkAPI.dispatch(authChecked());
      return thunkAPI.rejectWithValue("rejected аксес токен не найден");
    }
  }
);

export const {
  storeRefreshToken,
  authChecked,
  jwtExpired,
  userDelete,
  toggleAuthChecking,
} = authSlice.actions;

export default authSlice.reducer;
