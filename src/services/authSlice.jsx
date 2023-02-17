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
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // registration
      .addCase(registerRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerRequest.fulfilled, (state, { payload }) => {
        state.isAccessTokenValid = true;
        state.isAuthChecked = true;
        state.isUserLogged = true;
        state.loading = false;
        state.userInfo = payload.user;
        setCookie("accessToken", payload.accessToken);
        setCookie("refreshToken", payload.refreshToken);
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
        state.isAccessTokenValid = true;
        state.isAuthChecked = true;
        state.isUserLogged = true;
        state.loading = false;
        state.userInfo = payload.user;
        setCookie("accessToken", payload.accessToken);
        setCookie("refreshToken", payload.refreshToken);
      })
      .addCase(loginRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // logout
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutRequest.fulfilled, (state, { payload }) => {
        state.isAccessTokenValid = false;
        state.isAuthChecked = false;
        state.isUserLogged = false;
        state.loading = false;
        state.userInfo = null;
        state.error = null;
        console.log("logout suc");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addCase(logoutRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // new token
      .addCase(getNewAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewAccessToken.fulfilled, (state, { payload }) => {
        state.isAccessTokenValid = true;
        state.loading = false;
        deleteCookie("refreshToken");
        deleteCookie("accessToken")
        setCookie("accessToken", payload.accessToken);
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
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
        state.isAuthChecked = true;
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

export const logoutRequest = createAsyncThunk(
  "auth/logout",
  async ({ token }, thunkAPI) => {
    console.log("sent req for logout", token);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/logout`, {
        token,
      });
      return data;
    } catch (error) {
      console.log("logout err");

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
  async (_, thunkAPI) => {
    const refreshToken = getCookie("refreshToken");
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

// надо переделать access в куки, тогда мб лучше будет
export const checkUserAuth = createAsyncThunk(
  "auth/checkUserAuth",
  async (_, thunkAPI) => {
    const accessToken = getCookie("accessToken");
    console.log(accessToken)
    if (accessToken) {
      try {
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
      } 
    } else {
      console.log("аксеса нет, надо взять аксес");
      return thunkAPI.rejectWithValue("rejected аксес токен не найден");
    }
  }
);


// export const authRequest = (accessToken) => {
//   return axios.get(`${BASE_URL}/auth/user`, {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: accessToken,
//     },
//   }).then((response) => {
//     if(response.data.accessToken) {
      
//     }
//   });
// };



export const {
  storeRefreshToken,
  authChecked,
  jwtExpired,
  userDelete,
  toggleLoading,
} = authSlice.actions;

export default authSlice.reducer;
