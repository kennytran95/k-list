import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchMap from "./SearchMap";
import axios from "axios";
import { ModalContext } from "../Home";

export interface business {
  name: string;
  image: string;
  location: string;
  type: string[];
}

const ModalContent: React.FC = (): JSX.Element => {
  const [useMyLocation, setUseMyLocation] = React.useState<boolean>(false);
  const [business, setBusiness] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [yelpResults, setYelpResults] = React.useState<business[]>([]);

  const ModalState = React.useContext(ModalContext);

  function changeBusiness(event: React.ChangeEvent<HTMLInputElement>) {
    setBusiness(event.target.value);
  }

  function changeLocation(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }

  //future implementation after MVP -> get my location!
  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    setUseMyLocation(event.target.checked);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const getBusinesses = async () => {
      const businesses = await axios.get(`/api/yelp/${business}/${location}`);
      setYelpResults(businesses.data);
    };
    getBusinesses();
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return (
    <form className="modal-container" onSubmit={(event) => handleSubmit(event)}>
      <div
        className="return-btn-container"
        onClick={() => ModalState.toggleModal(false)}
      >
        <IconButton
          color="inherit"
          aria-label="add to shopping cart"
          className="return-icon"
        >
          <ReplayIcon />
        </IconButton>
      </div>
      <Typography
        variant="h2"
        color="text.secondary"
        style={{ marginBottom: "30px" }}
      >
        Add to {ModalState.openedListName}
      </Typography>
      <TextField
        id="business-search"
        label="Search on Yelp"
        variant="standard"
        fullWidth
        color="secondary"
        helperText="Food, Entertainment, Business"
        onChange={changeBusiness}
      />
      <br />

      <TextField
        id="location-search"
        label="Location"
        variant="standard"
        color="secondary"
        disabled={useMyLocation}
        onChange={changeLocation}
      />

      <br />
      <FormControlLabel
        label="Use my location"
        control={
          <Checkbox
            checked={useMyLocation}
            onChange={handleCheck}
            color="secondary"
          />
        }
      />
      {/* <Checkbox checked={useMyLocation} onChange={handleCheck} /> */}
      <br />
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<SearchIcon />}
        style={{ margin: "1rem 0rem" }}
        type="submit"
      >
        Submit
      </Button>
      <SearchMap yelpResults={yelpResults} />
    </form>
  );
};

export default ModalContent;
