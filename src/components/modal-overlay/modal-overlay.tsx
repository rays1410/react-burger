import { IModalOverlay } from "../../utils/interfaces";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay: React.FC<IModalOverlay> = ({ children, onClosed }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClosed}>
      {children}
    </div>
  );
};

export default ModalOverlay;
