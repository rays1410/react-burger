import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsData from "../../utils/data.js";
import constructorStyles from "./burger-constructor.module.css";

const getItemByID = (data: any, id: any) => {
  return data.find((item: { _id: any }) => item._id === id);
};

// TODO there: replace num field by Symbol and fetch data from server
const hardcodedIDs = [
  {
    name: "Соус традиционный галактический",
    _id: "60666c42cc7b410027a1a9b9",
    num: 0,
  },
  {
    name: "Мясо бессмертных моллюсков Protostomia",
    _id: "60666c42cc7b410027a1a9b4",
    num: 1,
  },
  {
    name: "Плоды Фалленианского дерева",
    _id: "60666c42cc7b410027a1a9bc",
    num: 2,
  },
  {
    name: "Хрустящие минеральные кольца",
    _id: "60666c42cc7b410027a1a9b9",
    num: 3,
  },
  {
    name: "Хрустящие минеральные кольца",
    _id: "60666c42cc7b410027a1a9bb",
    num: 4,
  },
  {
    name: "Кристаллы марсианских альфа-сахаридов",
    _id: "60666c42cc7b410027a1a9bd",
    num: 5,
  },
  {
    name: "Кристаллы марсианских альфа-сахаридов",
    _id: "60666c42cc7b410027a1a9bd",
    num: 6,
  },
];

const BurgerConstructor = () => {
  return (
    <div className={constructorStyles.mainBlock}>
      <div className={constructorStyles.allBurgerElements}>
        {/* It seems that allBurgerElements level is redundant */}

        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={ingredientsData[1].image}
        />

        <div className={constructorStyles.dynamicBurgerElements}>
          {hardcodedIDs.map((item) => (
            <div key={item.num} className={constructorStyles.burgerItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={15}
                thumbnail={getItemByID(ingredientsData, item._id).image}
              />
            </div>
          ))}
        </div>
        
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={ingredientsData[1].image}
        />
      </div>

      <div className={constructorStyles.priceAndOrder}>
        <div className={constructorStyles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </div>
      
    </div>
  );
};

export default BurgerConstructor;
