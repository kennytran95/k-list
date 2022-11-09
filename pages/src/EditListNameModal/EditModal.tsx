import React from "react";
import ReactDOM from "react-dom";
import EditModalContent from "./EditModalContent";
import { ModalContext } from "../Home";

const EditModal: React.FC = (): JSX.Element => {
  const portal = document.getElementById("portal") as HTMLElement;
  const ModalState = React.useContext(ModalContext);

  return ReactDOM.createPortal(
    <div className="modal-comp-container">
      <div
        className="overlay"
        onClick={() => ModalState.toggleEditListModal(false)}
      ></div>
      <EditModalContent />
    </div>,
    portal
  );
};

export default EditModal;
