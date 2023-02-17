import React from "react";
import { useLocation, useParams } from "react-router";
import { useAppSelector } from "../..";
import styles from "./ingredient-page.module.css"
import { nutrientsNameMapping } from "../../utils/constants";
import { fetchIngredient } from "../../services/ingredientSlice";
import { useDispatch } from "react-redux";

const IngredientPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientsData = useAppSelector(
    (state) => state.ingredients.ingredientsData
  );
  
  const modalIngredient = ingredientsData.find(item => item._id === id )
   
  return (
    <div>
      <img
        src={modalIngredient.image_large}
        className={`mb-4`}
        alt="картинка ингредиента"
      />
      <p className="text text_type_main-medium mb-5">{modalIngredient.name}</p>
      <div className={styles.bottomTable}>
        {Object.entries(nutrientsNameMapping).map(([key, value]) => (
          <div key={key} className={styles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {value}
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {modalIngredient[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientPage;
