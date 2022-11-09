import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import NotesIcon from "@mui/icons-material/Notes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { ModalContext, setListContext } from "../Home";

interface Props {
  listItem: listItem;
}

interface listItem {
  listItemId: number;
  itemName: string;
  location: string;
  notes: string;
  type: string;
  image?: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardEntry: React.FC<Props> = ({ listItem }) => {
  const [expanded, setExpanded] = React.useState(false);

  const ModalFunctions = React.useContext(ModalContext);
  const setLists = React.useContext(setListContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteListItem = (listItemId: number): void => {
    axios
      .delete(`/api/klistItem/${listItemId}`)
      .then(() => {
        axios.get("/api/klist").then((result) => {
          let listEntries = [];
          for (let entry of result.data) {
            if (!entry.ListEntry.listItems) delete entry.ListEntry.listItems;
            listEntries.push(entry.ListEntry);
          }
          setLists(listEntries);
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="card-entry">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[300] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => deleteListItem(listItem.listItemId)}
              aria-label="settings"
            >
              <ClearIcon />
            </IconButton>
          }
          title={listItem.itemName.toUpperCase()}
          subheader={listItem.type}
        />
        <CardMedia
          component="img"
          height="194"
          image={listItem.image}
          alt="List Image"
          title="food image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {listItem.location}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="edit"
            onClick={() =>
              ModalFunctions.setEditNotesModal(listItem.listItemId)
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ContentCopyIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <NotesIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Notes:</Typography>
            <Typography paragraph>{listItem.notes}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </section>
  );
};

export default CardEntry;
