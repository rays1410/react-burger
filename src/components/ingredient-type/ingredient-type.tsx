import ingredientStyles from "./ingredient-type.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { IngredientObject, IngredientTypeTypes } from "../../utils/interfaces";
import { Element } from "react-scroll";
import { Link, useLocation } from "react-router-dom";

// This component contains groups of ingredients, for example buns

const IngredientType = ({
  children,
  data,
  typeName,
  ingredientClickHandler,
}: IngredientTypeTypes) => {
  const location = useLocation();
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
            <Link
              key={item._id}
              to={`ingredients/${item._id}`}
              state={{ background: location }}
            >
              <IngredientCard
                ingredient={item}
                ingredientClickHandler={ingredientClickHandler}
              />
            </Link>
          ))}
        </div>
      </Element>
    </>
  );
};

export default IngredientType;
