import { ModalOverlayTypes } from "../../utils/interfaces";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onClosed }: ModalOverlayTypes) => {
  
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClosed}>
      {children}
    </div>
  );
};

export default ModalOverlay;
