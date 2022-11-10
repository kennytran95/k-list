import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { list } from "./CardList";
import { setListContext } from "../Home";

const AddList: React.FC = ({}): JSX.Element => {
  const [listName, setListName] = React.useState<string>("");

  const setLists = React.useContext(setListContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!listName) return;
    let body = {
      listName,
    };
    axios
      .post("/api/klist", body)
      .catch((err) => console.log(err))
      .then(() => {
        axios.get("/api/klist").then((result) => {
          let listEntries = [];
          for (let entry of result.data) {
            if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
            listEntries.push(entry.ListEntry);
          }
          setLists(listEntries);
          setListName("");
        });
        alert("Successfully created list!");
      });
  }
  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className="add-list-container"
    >
      {/* <h2>{listName}</h2> */}
      <div className="form-container">
        <TextField
          id="standard-basic"
          label="List"
          variant="standard"
          fullWidth
          color="secondary"
          helperText="Add a new list"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        />
        {/* <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          style={{ margin: "1rem 0rem" }}
        >
          Submit
        </Button> */}
        <div className="send-icon-container">
          <IconButton size="large" type="submit">
            <SendIcon className="send-icon-btn" />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

export default AddList;
