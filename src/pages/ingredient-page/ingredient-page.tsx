import { Navigate, useParams } from "react-router";
import { useAppSelector } from "../..";
import styles from "./ingredient-page.module.css";
import { nutrientsNameMapping } from "../../utils/constants";
import { IngredientObject } from "../../utils/interfaces";
import { PATH_ERR } from "../../utils/pageNames";

const IngredientPage = () => {
  const { id } = useParams();

  const ingredientsData = useAppSelector(
    (state) => state.ingredients.ingredientsData
  );
  const ingredient = ingredientsData.find((item) => item._id === id);

  return ingredient ? (
    <div className={styles.mainBlock}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img
        src={ingredient?.image_large}
        className={`mb-4`}
        alt="картинка ингредиента"
      />
      <p className="text text_type_main-medium mb-5">{ingredient?.name}</p>
      <div className={styles.bottomTable}>
        {Object.entries(nutrientsNameMapping).map(([key, value]) => (
          <div key={key} className={styles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {value}
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredient[key as keyof IngredientObject]}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Navigate to={PATH_ERR} />
  );
};

export default IngredientPage;
