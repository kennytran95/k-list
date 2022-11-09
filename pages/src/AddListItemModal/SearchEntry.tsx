import * as React from "react";
import axios from "axios";
import { business } from "./ModalContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ModalContext, setListContext } from "../Home";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  yelpResult: business;
}

const SearchEntry: React.FC<Props> = ({ yelpResult }) => {
  const [open, setOpen] = React.useState(false);

  const ModalState = React.useContext(ModalContext);
  const setLists = React.useContext(setListContext);

  const handleClick = () => {
    setOpen(true);
    let item = {
      name: yelpResult.name,
      location: yelpResult.location,
      notes: "",
      type: yelpResult.type[0], //fix this l8r
      image: yelpResult.image,
      listId: ModalState.openedList,
    };
    axios.post("/api/klistItem", item).then(() => {
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
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 400, bgcolor: "inherit" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="business-image" src={yelpResult.image} />
          </ListItemAvatar>
          <ListItemText
            primary={yelpResult.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {yelpResult.location + " - "}
                </Typography>
                {yelpResult.type.map((foodtype, index) => {
                  return (
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        key={index}
                      >
                        {foodtype + " "}
                      </Typography>
                    </>
                  );
                })}
              </React.Fragment>
            }
          />
          <IconButton onClick={handleClick} aria-label="add">
            <AddCircleIcon />
          </IconButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Added to list!
            </Alert>
          </Snackbar>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default SearchEntry;
