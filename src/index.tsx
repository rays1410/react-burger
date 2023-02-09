import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "@ya.praktikum/react-developer-burger-ui-components/";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./services/ingredientSlice";
import constructorSlice from "./services/constructorSlice";
import forgotPasswordSlice from "./services/forgotPasswordSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burgerConstructor: constructorSlice,
    forgotPasswordSlice: forgotPasswordSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
