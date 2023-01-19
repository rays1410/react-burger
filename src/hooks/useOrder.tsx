import { useState, useCallback } from "react";
import { IngredientObject } from "../utils/interfaces";
import axios from "axios";

const useOrder = <T, E = string>(
  currentIngredients: IngredientObject[],
  url: string,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Possible states of the request
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  // State where we save orderNum from server
  const [orderNum, setOrderNum] = useState<string>("");

  // State for error. In future work we need to use it in the
  // conditional rendering.
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus("pending");
    setError(null);

    // Collect the array of id's as it is required
    const idArray = currentIngredients.map((item) => item._id);
    axios
      .post(url, {
        ingredients: idArray,
      })
      .then((res: any) => {
        setStatus("success");
        setOrderNum(res.data.order.number);
        setModalVisible(true);
      })
      .catch((error: any) => {
        setError(error);
        setStatus("error");
        console.log(error.response.data.error);
      });
  }, [currentIngredients]);

  return { execute, status, error, orderNum };
};

export default useOrder;
