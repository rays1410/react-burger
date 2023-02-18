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
