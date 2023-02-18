export const ESC_BUTTON = "Escape";

export const ERR_ACCESS_TOKEN_EXPIRED = "jwt expired";
export const ERR_ACCESS_TOKEN_ISNT_UPDATED =
  "Error: access token is not updated";
export const ERR_ACCESS_TOKEN_UNDEFINED = "Error: access token is undefined";

export const ERR_USER_DATA_ISNT_UPDATED =
  "Ошибка: не получилось обновить данные - сервер не отвечает, попробуйте ещё раз";
export const ERR_USER_LOGOUT =
  "Ошибка: не получилось выйти - сервер не отвечает: попробуйте ещё раз";
export const ERR_USER_LOGIN = "Ошибка: неправильный логин или пароль.";
export const ERR_USER_REGISTRATION =
  "Ошибка: не получилось зарегистрироваться - сервер не отвечает, либо я криво написал код: попробуйте ещё раз";
export const ERR_SERVER = "Сервер не отвечает";

export const SUCC_REGISTRATION = "Регистрация прошла успешно!"
export const SUCC_LOGIN = "Вы успешно залогинились!"
export const SUCC_USER_DATA_UPDATE = "Вы успешно изменили данные!"
export const SUCC_USER_LOGOUT = "Вы успешно вышли"


export const REFRESH_TOKEN_NAME = "refreshToken";
export const ACCESS_TOKEN_NAME = "accessToken";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const nutrientsNameMapping = {
  calories: "Калории, ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

export const titlesEntries = Object.entries({
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
});

export const CONSTANT_BUN = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

export const ORDER_NUMBER_LOADING = -1;
