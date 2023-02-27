import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../utils/utils";
import { BASE_URL } from "../utils/constants";
import { IIngredientsState } from "../utils/interfaces";

const initialState: IIngredientsState = {
  ingredientsData: [],
  modalIngredient: null,
  status: "idle",
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredientsSlice",
  initialState,
  reducers: {
    setModalIngredient(state, action) {
      state.modalIngredient = action.payload;
    },
  },

  // Отправляем ингредиенты и обрабатываем ответ
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredientsData = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await getData(`${BASE_URL}/ingredients`);
    return response.data;
  }
);

export const { setModalIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
