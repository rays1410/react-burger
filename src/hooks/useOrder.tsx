import { useState, useCallback } from "react";
// import { IngredientObject } from "../utils/interfaces";
// import axios from "axios";
// import { ConstructorItem } from "../services/constructorSlice";

// const useOrder = (
//   currentIngredients: ConstructorItem[],
//   currentBun: IngredientObject,
//   url: string,
//   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   // Possible states of the request
//   const [status, setStatus] = useState<
//     "idle" | "pending" | "success" | "error"
//   >("idle");

//   // State where we save orderNum from server
//   const [orderNum, setOrderNum] = useState<string | number>("");
//   // State for error. In future work we need to use it in the
//   // conditional rendering.
//   const [error, setError] = useState(null);

//   const execute = useCallback(() => {
//     setStatus("pending");
//     setError(null);

//     // Collect the array of id's as it is required
//     const ingredientsId = currentIngredients.map((item) => item.ingredient._id);

//     // Wrap ingredients in buns
//     const idArray = [currentBun._id, ...ingredientsId, currentBun._id];

//     axios
//       .post(url, {
//         ingredients: idArray,
//       })
//       .then((res: any) => {
//         setStatus("success");
//         setOrderNum(res.data.order.number);
//         setModalVisible(true);
//       })
//       .catch((error: any) => {
//         setError(error);
//         setStatus("error");
//         console.log(error.response.data.error);
//       });
//   }, [currentIngredients, currentBun._id, setModalVisible, url]);

//   return { execute, status, error, orderNum };
// };

// export default useOrder;
