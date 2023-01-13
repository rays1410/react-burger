import modalStyles from "./modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

// const Modal = ({ children, header, onClose }: any) => {
//   return ReactDOM.createPortal(
//     <div className={modalStyles.modalMain}>
//       <div>
//         {/* <ModalHeader onClose={onClose}>{header}</ModalHeader> */}
//         {children}
//       </div>
//       {/* <ModalBackDrop onClose={onClose} /> */}
//     </div>,
//     modalRoot
//   );
// };

const Modal = ({ children, header, onClose }: any) => {
  return (
    <div className={modalStyles.modalMain}>
      <div className={modalStyles.title}>
        <p className={`${modalStyles.textOrderId} text text_type_main-large`}>
          {header}
        </p>
        <p className={`${modalStyles.closeButton}`}>
          <span onClick={() => console.log("Closed")}>
            <CloseIcon type="primary" />
          </span>
        </p>
      </div>
      <div className={`${modalStyles.modalContent}`}>{children}</div>
    </div>
  );
};

export default Modal;
