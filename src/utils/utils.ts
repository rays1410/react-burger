import axios from "axios";

export const getData = async (url: string) =>
  axios
    .get(url)
    .then((res) =>
      res.data.success
        ? res.data
        : res.data.then((err: any) => Promise.reject(err))
    )
    .catch((error) => {
      console.log(error);
    });


