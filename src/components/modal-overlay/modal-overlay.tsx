import React from "react";
import { ESC_BUTTON } from "../../utils/constants";
import { ModalOverlayTypes } from "../../utils/interfaces";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onClosed }: ModalOverlayTypes) => {
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
      {children}
    </div>
  );
};

export default ModalOverlay;
