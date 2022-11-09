import * as React from "react";
import CardEntry from "./CardEntry";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ModalContext, setListContext } from "../Home";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  listEntry: list;
  // toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface list {
  listid: number;
  listName: string;
  listItems?: listItem[];
}

export interface listItem {
  listItemId: number;
  itemName: string;
  location: string;
  notes: string;
  type: string;
  image?: string;
}

const CardList: React.FC<Props> = ({ listEntry }) => {
  const setLists = React.useContext(setListContext);
  const ModalFunctions = React.useContext(ModalContext);
  const [sortBy, setSortBy] = React.useState("");

  const changeSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    axios
      .get("/api/klist")
      .then((result) => {
        let listEntries = [];
        for (let entry of result.data) {
          if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
          listEntries.push(entry.ListEntry);
        }
        //add logic here to sort
        setLists(listEntries);
      })
      .catch((err) => console.error(err));
  };

  function deleteList(listId: number) {
    axios.delete(`/api/klist/${listId}`);
    axios
      .get("/api/klist")
      .then((result) => {
        let listEntries = [];
        for (let entry of result.data) {
          if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
          listEntries.push(entry.ListEntry);
        }
        setLists(listEntries);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="list-container">
      <h1 className="list-name">{listEntry.listName}</h1>
      <ButtonGroup
        aria-label="medium secondary button group"
        variant="contained"
        color="primary"
        style={{ margin: "0px 0px 40px" }}
      >
        <IconButton
          size="small"
          color="secondary"
          onClick={() =>
            ModalFunctions.setModal(listEntry.listid, listEntry.listName)
          }
        >
          <AddIcon />
        </IconButton>
        <IconButton
          size="small"
          color="secondary"
          onClick={() =>
            ModalFunctions.setEditModal(listEntry.listid, listEntry.listName)
          }
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => deleteList(listEntry.listid)}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-sort">Sort By...</InputLabel>
          <Select
            labelId="select-label"
            id="select-sort"
            value={sortBy}
            label="Sort By"
            onChange={changeSortBy}
          >
            <MenuItem value={10}>Location</MenuItem>
            <MenuItem value={20}>Date Added</MenuItem>
            <MenuItem value={30}>Types</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="list-item-container">
        {listEntry.listItems &&
          listEntry.listItems.map((listItem, index) => (
            <CardEntry listItem={listItem} key={index} />
          ))}
      </div>
    </div>
  );
};

export default CardList;
