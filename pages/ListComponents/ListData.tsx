import * as React from "react";
import CardList from "./CardList";
import { list } from "./CardList";

interface Props {
  lists: list[];
}

const ListData: React.FC<Props> = ({ lists }) => {
  return (
    <section className="list-section">
      {lists.map((listEntry) => (
        <CardList listEntry={listEntry} key={listEntry.listid} />
      ))}
    </section>
  );
};

export default ListData;
