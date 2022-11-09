import * as React from "react";
import * as ReactDOM from "react-dom";
import ModalContent from "./ModalContent";
import { ModalContext } from "../Home";

const Modal: React.FC = (): JSX.Element => {
  const portal = document.getElementById("portal") as HTMLElement;
  const ModalState = React.useContext(ModalContext);

  return ReactDOM.createPortal(
    <div className="modal-comp-container">
      <div
        className="overlay"
        onClick={() => ModalState.toggleModal(false)}
      ></div>
      <ModalContent></ModalContent>
    </div>,
    portal
  );
};

export default Modal;
