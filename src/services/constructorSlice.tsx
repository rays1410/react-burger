import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { ORDER_URL } from "../utils/constants";
import { IngredientObject } from "../utils/interfaces";
import axios from "axios";

export interface ConstructorItem {
  id: string;
  ingredient: IngredientObject;
}

export interface BurgerIngredientsState {
  currentIngredients: ConstructorItem[];
  currentBun: IngredientObject;
  orderNumber: number;
  totalPrice: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: BurgerIngredientsState = {
  currentIngredients: [] as ConstructorItem[],
  currentBun: {} as IngredientObject,
  orderNumber: -1,
  totalPrice: 0,
  status: "idle",
  error: null,
};

const constructorSlice = createSlice({
  name: "constructorSlice",
  initialState: initialState,
  reducers: {
    // Добавляем ингредиент
    addIngredient: {
      // Сам редьюсер
      reducer: (state, action: PayloadAction<ConstructorItem>) => {
        state.currentIngredients.push(action.payload);
      },

      // Дефолтный айдишник IngredientObject нам не подходит (он не уникальный),
      // поэтому добавляем уникальный с помощью nanoid и только потом
      // кладем к ингредиентам
      prepare: (ingredient: IngredientObject) => {
        const id = nanoid();
        return { payload: { id, ingredient } };
      },
    },

    // Удаляем ингредиент
    removeIngredient: (state, action) => {
      state.currentIngredients = state.currentIngredients.filter(
        (item) => item.id !== action.payload
      );
    },

    // Удаляем ингредиент
    setBun: (state, action) => {
      state.currentBun = action.payload;
    },

    // Сортировка перетаскиванием ингредиентов
    reorderIngredients: (state, action) => {
      const item = state.currentIngredients.splice(action.payload.from, 1)[0];
      state.currentIngredients.splice(action.payload.to, 0, item);
    },

    // Пересчитываем цену
    calculateTotalPrice: (state) => {
      const bunPrice =
        Object.keys(state.currentBun).length === 0
          ? 0
          : state.currentBun.price * 2;

      state.totalPrice = state.currentIngredients.reduce(
        (totalPrice, item) => (totalPrice += item?.ingredient.price),
        bunPrice
      );
    },
  },

  // Тут ловим результат запроса
  extraReducers(builder) {
    builder
      .addCase(sendOrderRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendOrderRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNumber = action.payload;
      })
      .addCase(sendOrderRequest.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const postOrder = async (url: string, idArray: string[]) =>
  axios
    .post(url, {
      ingredients: idArray,
    })
    .then((res: any) => {
      return res.data.success ? res.data.order.number : 0;
    });

export const sendOrderRequest = createAsyncThunk(
  "order/sendOrder",
  async (idArray: string[]) => {
    const response = await postOrder(ORDER_URL, idArray);
    return response;
  }
);

export const {
  addIngredient,
  removeIngredient,
  setBun,
  reorderIngredients,
  calculateTotalPrice,
} = constructorSlice.actions;
export default constructorSlice.reducer;
