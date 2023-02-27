import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IModal } from "../../utils/interfaces";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ESC_BUTTON } from "../../utils/constants";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: React.FC<IModal> = ({ children, header, onClosedModal }) => {

  // Subscription on ESC button
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.code === ESC_BUTTON) {
        onClosedModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClosedModal]);

  return ReactDOM.createPortal(
    <ModalOverlay onClosed={onClosedModal}>
      <div
        className={modalStyles.modalMain}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.title}>
          <p className={`${modalStyles.textOrderId} text text_type_main-large`}>
            {header}
          </p>
          <p className={`${modalStyles.closeButton}`}>
            <span onClick={onClosedModal}>
              <CloseIcon type="primary" />
            </span>
          </p>
        </div>
        <div className={`${modalStyles.modalContent}`}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
