import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "@ya.praktikum/react-developer-burger-ui-components/";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./services/ingredientSlice";
import constructorSlice from "./services/constructorSlice";
import authSlice from "./services/authSlice";
import resetPasswordSlice from "./services/resetPasswordSlice";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burgerConstructor: constructorSlice,
    authSlice: authSlice,
    resetPasswordSlice: resetPasswordSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
