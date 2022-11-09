import * as React from "react";
import * as ReactDOM from "react-dom";
import EditNotesModalContent from "./EditNotesModalContent";
import { ModalContext } from "../Home";

const EditNotesModal: React.FC = (): JSX.Element => {
  const portal = document.getElementById("portal") as HTMLElement;
  const ModalState = React.useContext(ModalContext);
  return ReactDOM.createPortal(
    <div className="modal-comp-container">
      <div
        className="overlay"
        onClick={() => ModalState.toggleEditNotesModal(false)}
      ></div>
      <EditNotesModalContent />
    </div>,
    portal
  );
};

export default EditNotesModal;
