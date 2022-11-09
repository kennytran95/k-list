import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
import { ModalContext, setListContext } from "../Home";

export interface business {
  name: string;
  image: string;
  location: string;
  type: string[];
}

const EditNotesModalContent: React.FC = (): JSX.Element => {
  const [notes, setNotes] = React.useState<string>("");

  const setLists = React.useContext(setListContext);
  const ModalState = React.useContext(ModalContext);

  const changeNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let body = {
      notes,
    };
    axios
      .put(`/api/klistItem/${ModalState.selectedItem}`, body)
      .then(() => {
        axios.get("/api/klist").then((result) => {
          let listEntries = [];
          for (let entry of result.data) {
            if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
            listEntries.push(entry.ListEntry);
          }
          setLists(listEntries);
          setNotes("");
          ModalState.toggleEditNotesModal(false);
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <form className="modal-container" onSubmit={(event) => handleSubmit(event)}>
      <div className="return-btn-container">
        <IconButton
          color="inherit"
          aria-label="add to shopping cart"
          className="return-icon"
          onClick={() => ModalState.toggleEditNotesModal(false)}
        >
          <ReplayIcon />
        </IconButton>
      </div>
      <Typography
        variant="h2"
        color="text.secondary"
        style={{ marginBottom: "30px" }}
      >
        Edit your item's notes
      </Typography>
      <TextField
        variant="standard"
        fullWidth
        helperText="Enter your new notes"
        value={notes}
        onChange={changeNotes}
      />
      <br />

      <Button
        variant="outlined"
        color="inherit"
        endIcon={<ChangeCircleIcon />}
        style={{ margin: "1rem 0rem" }}
        type="submit"
      >
        Add Notes
      </Button>
    </form>
  );
};

export default EditNotesModalContent;
