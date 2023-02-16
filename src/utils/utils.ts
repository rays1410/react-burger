import axios from "axios";

export const getData = async (url: string) =>
  axios
    .get(url)
    .then((res) =>
      res.data.success
        ? res.data
        : res.data.then((err: any) => Promise.reject(err))
    );

export const postOrder = async (url: string, idArray: string[]) => {
  return axios
    .post(url, {
      ingredients: idArray,
    })
    .then((res: any) => {
      return res.data.success ? res.data.order.number : 0;
    });
};

export const registerUser = async (
  url: string,
  email: string,
  password: string,
  name: string
) =>
  axios
    .post(url, {
      email: email,
      password: password,
      name: name,
    })
    .then((res: any) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log("ошибка в utils/register");
      Promise.reject(e)
    });

export const loginUser = async (url: string, email: string, password: string) =>
  axios
    .post(url, {
      email: email,
      password: password,
    })
    .then((res: any) => res.data)
    .catch((e) => console.log(e));

export const forgotPasswordRequest = (url: string, email: string) => {
  axios
    .post(url, {
      email: email,
    })
    .then((res: any) => {
      console.log(res);
      return res.data.success
        ? res.data
        : res.data.then((err: any) => Promise.reject(err));
    });
};

export const resetPasswordRequest = (url: string, email: string) => {
  // axios
  //   .post(url, {
  //     email: email,
  //   })
  //   .then((res: any) => {
  //     console.log(res);
  //     return res.data.success
  //       ? res.data
  //       : res.data.then((err: any) => Promise.reject(err));
  //   });
};
