import React from "react";
import { ESC_BUTTON } from "../../utils/constants";
import { ModalTypes } from "../../utils/interfaces";
import Modal from "../modal/modal";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, header, onClosed }: ModalTypes) => {
  // Subscription on ESC button
  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.code === ESC_BUTTON) {
        onClosed();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClosed]);

  return (
    <div className={modalOverlayStyles.overlay} onClick={onClosed}>
      <Modal children={children} header={header} onClosed={onClosed} />
    </div>
  );
};

export default ModalOverlay;
