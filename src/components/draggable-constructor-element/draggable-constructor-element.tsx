import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  calculateTotalPrice,
  removeIngredient,
  reorderIngredients,
} from "../../services/constructorSlice";
import draggableConstructorElementStyles from "./draggable-constructor-element.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import type { Identifier } from "dnd-core";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { IDraggableConstructorElementProps, IDragItem } from "../../utils/interfaces";


const DraggableConstructorElement = ({
  index,
  item,
}: IDraggableConstructorElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const handleRemoveIngredient = (itemId: string) => {
    // Удаляем элемент из конструктора
    dispatch(removeIngredient(itemId));

    // Пересчитываем цену
    dispatch(calculateTotalPrice());
  };

  // Этот большой кусок из доки react-dnd
  const [{ handlerId }, drop] = useDrop<
  IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ["constructor-ingredient"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderIngredients({ from: dragIndex, to: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructor-ingredient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={draggableConstructorElementStyles.burgerItem}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item?.ingredient.name}
        price={item?.ingredient.price}
        thumbnail={item?.ingredient.image || ""}
        handleClose={() => handleRemoveIngredient(item.id)}
      />
    </div>
  );
};

export default DraggableConstructorElement;
