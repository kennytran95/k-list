import * as React from "react";
import { business } from "./ModalContent";
import SearchEntry from "./SearchEntry";

interface Props {
  yelpResults: business[];
}

const SearchMap: React.FC<Props> = ({ yelpResults }) => {
  return (
    <>
      {yelpResults.map((yelpResult, index) => (
        <SearchEntry yelpResult={yelpResult} key={index} />
      ))}
    </>
  );
};

export default SearchMap;
