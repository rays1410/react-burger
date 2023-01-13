import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import doneIcon from "../../images/done.svg";

const IngredientDetails = ({
  ingredientImage,
  ingredientName,
  infoArray,
}: any) => {
  return (
    <div className={ingredientDetailsStyles.modalContent}>
      <img src={ingredientImage} className={`mb-4`} />
      <p className="text text_type_main-medium mb-5">{ingredientName}</p>
      <div className={ingredientDetailsStyles.bottomTable}>
        {infoArray.map((item: any) => <div className={ingredientDetailsStyles.tableItem}>12313</div>)}
      </div>
    </div>
  );
};

export default IngredientDetails;
