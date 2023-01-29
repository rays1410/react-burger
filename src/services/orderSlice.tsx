import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { getData } from "../utils/utils";
// import { INGREDIENTS_URL } from "../utils/constants";
// import { IngredientObject } from "../utils/interfaces";

// export interface OrderState {
//   idArray: string[];
//   orderNumber: number | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null | undefined;
// }

// const initialState: OrderState = {
//   idArray: [],
//   orderNumber: null,
//   status: "idle",
//   error: null,
// };

// const orderSlice = createSlice({
//   name: "ordersSlice",
//   initialState,
//   reducers: {
//     sendOrder: (state, action) => {
//     },
//   },
// //   extraReducers(builder) {
// //     builder
// //       .addCase(sendOrder.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(sendOrder.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.orderNumber = action.payload;
// //       })
// //       .addCase(sendOrder.rejected, (state, action) => {
// //         state.error = action.error.message;
// //       });
// //   },
// });



// export default orderSlice.reducer;
