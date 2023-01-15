import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalTypes } from "../../utils/interfaces";
import { ESC_BUTTON } from "../../utils/constants";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = ({ children, header, onClosed }: ModalTypes) => {
  // Subscription on ESC button
  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.code === ESC_BUTTON) {
        onClosed();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return ReactDOM.createPortal(
    <div className={modalStyles.overlay} onClick={onClosed}>
      <div
        className={modalStyles.modalMain}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.title}>
          <p className={`${modalStyles.textOrderId} text text_type_main-large`}>
            {header}
          </p>
          <p className={`${modalStyles.closeButton}`}>
            <span onClick={onClosed}>
              <CloseIcon type="primary" />
            </span>
          </p>
        </div>
        <div className={`${modalStyles.modalContent}`}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
