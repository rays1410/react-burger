import ingredientDetailsStyles from "./ingredient-details.module.css";
import { nutrientsNameMapping } from "../../utils/constants";
import { IIngredientObject } from "../../utils/interfaces";
import { useAppSelector } from "../..";
import { getIngredientsSlice } from "../../utils/utils";
import Loader from "../loader/loader";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();
  const { ingredientsData } = useAppSelector(getIngredientsSlice);
  const modalIngredient = ingredientsData.find((item) => item._id === id);

  return modalIngredient ? (
    <div className={ingredientDetailsStyles.modalContent}>
      <img
        src={modalIngredient.image_large}
        className={`mb-4`}
        alt="картинка ингредиента"
      />
      <p className="text text_type_main-medium mb-5">{modalIngredient.name}</p>
      <div className={ingredientDetailsStyles.bottomTable}>
        {Object.entries(nutrientsNameMapping).map(([key, value]) => (
          <div key={key} className={ingredientDetailsStyles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {value}
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {modalIngredient[key as keyof IIngredientObject]}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default IngredientDetails;
