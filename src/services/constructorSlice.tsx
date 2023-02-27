import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import {
  IBurgerIngredientsState,
  IConstructorItem,
  IIngredientObject,
} from "../utils/interfaces";
import { postOrder } from "../utils/utils";

const initialState: IBurgerIngredientsState = {
  currentIngredients: [] as IConstructorItem[],
  currentBun: {} as IIngredientObject,
  orderNumber: -1,
  totalPrice: 0,
  status: "idle",
  modalStatus: "no-bun-error",
  error: null,
};

const constructorSlice = createSlice({
  name: "constructorSlice",
  initialState: initialState,
  reducers: {
    // Добавляем ингредиент
    addIngredient: {
      // Сам редьюсер
      reducer: (state, action: PayloadAction<IConstructorItem>) => {
        state.currentIngredients.push(action.payload);
      },

      // Дефолтный айдишник IngredientObject нам не подходит (он не уникальный),
      // поэтому добавляем уникальный с помощью nanoid и только потом
      // кладем к ингредиентам
      prepare: (ingredient: IIngredientObject) => {
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

    // Устанавливаем булку
    setBun: (state, action) => {
      state.currentBun = action.payload;
      state.modalStatus = "bun-there";
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

    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },

    // Ресетим хранилище после успешного получения номера заказа
    reset(state) {
      state.currentBun = {} as IIngredientObject;
      state.currentIngredients = [] as IConstructorItem[];
      state.orderNumber = -1;
      state.modalStatus = "no-bun-error";
      state.error = null;
    },
  },

  // Тут ловим результат запроса
  extraReducers(builder) {
    builder
      .addCase(sendOrderRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOrderRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.modalStatus = "order-success";
        console.log(action);
        state.orderNumber = action.payload;
      })
      .addCase(sendOrderRequest.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        state.modalStatus = "order-failed";
      });
  },
});

export const sendOrderRequest = createAsyncThunk<number, string[]>(
  "order/sendOrder",
  async (idArray, thunkAPI) => {
    try {
      const data = await postOrder(`${BASE_URL}/orders`, idArray);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const {
  addIngredient,
  removeIngredient,
  setBun,
  reorderIngredients,
  calculateTotalPrice,
  reset,
  setModalStatus,
} = constructorSlice.actions;
export default constructorSlice.reducer;
