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

const initialState = {
  loading: false,
  requestSuccess: false,
  changeSuccess: false,
  message: null,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // forgotPassword
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, { payload }) => {
        state.message = payload.message;
        state.loading = false;
        state.requestSuccess = true;
      })
      .addCase(forgotPasswordRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.requestSuccess = false;
        state.loading = false;
      })

      // resetPassword
      .addCase(resetPasswordRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, { payload }) => {
        state.message = payload.message;
        state.loading = false;
        state.changeSuccess = true;
      })
      .addCase(resetPasswordRequest.rejected, (state, { payload }) => {
        state.error = payload;
        state.changeSuccess = false;
        state.loading = false;
      });
  },
});

export const forgotPasswordRequest = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      console.log(`Письмо отправлено на ${email}`);
      const { data } = await axios.post(`${BASE_URL}/password-reset`, {
        email: email,
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

export const resetPasswordRequest = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, emailToken }, { rejectWithValue }) => {
    try {
      console.log(`Новый пароль ${newPassword}, токен ${emailToken}`);
      const { data } = await axios.post(`${BASE_URL}/password-reset/reset`, {
        password: newPassword,
        token: emailToken,
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

export default resetPasswordSlice.reducer;
