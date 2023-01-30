import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import { ModalTypes } from "../../utils/interfaces";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = ({children, header, onClosed} : ModalTypes) => {

  return ReactDOM.createPortal(
      <div
        className={modalStyles.modalMain}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.title}>
          <p className={`text text_type_main-large`}>
            {header}
          </p>
          <p className={`${modalStyles.closeButton}`}>
            <span onClick={onClosed}>
              <CloseIcon type="primary" />
            </span>
          </p>
        </div>
        <div className={`${modalStyles.modalContent}`}>{children}</div>
      </div>,
    modalRoot
  );
};

export default Modal;
