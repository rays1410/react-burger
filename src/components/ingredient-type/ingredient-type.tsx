import ingredientStyles from "./ingredient-type.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { IngredientObject, IngredientTypeTypes } from "../../utils/interfaces";
import { Element } from "react-scroll";

// This component contains groups of ingredients, for example buns

const IngredientType = ({
  children,
  data,
  typeName,
  ingredientClickHandler,
}: IngredientTypeTypes) => {
  return (
    <>
      <Element name={typeName}>
        <p
          className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
        >
          {children}
        </p>
        <div className={ingredientStyles.ingredientsButch}>
          {data.map((item: IngredientObject) => (
            <IngredientCard
              key={item._id}
              ingredient={item}
              ingredientClickHandler={ingredientClickHandler}
            />
          ))}
        </div>
      </Element>
    </>
  );
};

export default IngredientType;
