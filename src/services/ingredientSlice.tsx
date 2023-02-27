import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../utils/utils";
import { BASE_URL } from "../utils/constants";
import { IIngredientObject, IIngredientsState } from "../utils/interfaces";

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

export const fetchIngredients = createAsyncThunk<IIngredientObject[]>(
  "ingredients/fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const { data } = await getData(`${BASE_URL}/ingredients`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const { setModalIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
