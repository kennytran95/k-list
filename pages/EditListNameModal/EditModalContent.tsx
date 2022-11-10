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

const EditModalContent: React.FC = (): JSX.Element => {
  const [newListName, setNewListName] = React.useState<string>("");

  const ModalState = React.useContext(ModalContext);
  const setLists = React.useContext(setListContext);

  const changeNewListName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(event.target.value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let prev = {
      newListName: newListName,
    };
    axios
      .put(`/api/klist/${ModalState.openedList}`, prev)
      .then(() => {
        axios.get("/api/klist").then((result) => {
          let listEntries = [];
          for (let entry of result.data) {
            if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
            listEntries.push(entry.ListEntry);
          }
          setLists(listEntries);
          setNewListName("");
          ModalState.toggleEditListModal(false);
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
          onClick={() => ModalState.toggleEditListModal(false)}
        >
          <ReplayIcon />
        </IconButton>
      </div>
      <Typography
        variant="h2"
        color="text.secondary"
        style={{ marginBottom: "30px" }}
      >
        Change {ModalState.openedListName}'s name
      </Typography>
      <TextField
        variant="standard"
        fullWidth
        helperText="Enter new list name"
        value={newListName}
        onChange={changeNewListName}
      />
      <br />

      <Button
        variant="outlined"
        color="inherit"
        endIcon={<ChangeCircleIcon />}
        style={{ margin: "1rem 0rem" }}
        type="submit"
      >
        Change
      </Button>
    </form>
  );
};

export default EditModalContent;
