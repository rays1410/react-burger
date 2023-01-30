import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../utils/utils";
import { BASE_URL } from "../utils/constants";
import { IngredientObject } from "../utils/interfaces";

export interface IngredientsState {
  ingredientsData: IngredientObject[];
  modalIngredient: IngredientObject | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: IngredientsState = {
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
      .addCase(fetchIngredients.pending, (state, action) => {
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
