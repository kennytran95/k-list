import * as React from "react";
import listData from "../../dummyData.js";
import AddList from "./ListComponents/AddList";
import Modal from "./AddListItemModal/Modal";
import EditModal from "./EditListNameModal/EditModal";
import EditNotesModal from "./EditNotesModal/EditNotesModal";
import ListData from "./ListComponents/ListData";
import Navbar from "./NavBar/Navbar";
import axios from "axios";
import { list } from "./ListComponents/CardList";

interface Modals {
  setModal: (listNumber: number, listName: string) => void;
  setEditModal: (listNumber: number, listName: string) => void;
  setEditNotesModal: (listId: number) => void;
  openedList: number | null;
  openedListName: string | null;
  selectedItem: number | null;
  toggleEditListModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditNotesModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const setListContext = React.createContext<React.Dispatch<list[]>>(
  () => undefined
);

export const ModalContext = React.createContext<Modals>({
  setModal: () => undefined,
  setEditModal: () => undefined,
  setEditNotesModal: () => undefined,
  openedList: null,
  openedListName: null,
  selectedItem: null,
  toggleEditListModal: () => undefined,
  toggleEditNotesModal: () => undefined,
  toggleModal: () => undefined,
});

const Home: React.FC = (): JSX.Element => {
  const [modal, toggleModal] = React.useState<boolean>(false);
  const [editListModal, toggleEditListModal] = React.useState<boolean>(false);
  const [editNotesModal, toggleEditNotesModal] = React.useState<boolean>(false);
  const [lists, setLists] = React.useState<list[]>(listData);
  const [openedList, setOpenedList] = React.useState<number | null>(null);
  const [openedListName, setOpenedListName] = React.useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = React.useState<number | null>(null);

  const ModalContextValues = {
    setModal,
    setEditModal,
    setEditNotesModal,
    openedList,
    openedListName,
    selectedItem,
    toggleEditListModal,
    toggleEditNotesModal,
    toggleModal,
  };

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    if (modal || editListModal || editNotesModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [modal, editListModal, editNotesModal]);

  function setModal(listNumber: number, listName: string) {
    toggleModal(true);
    setOpenedList(listNumber);
    setOpenedListName(listName);
  }

  function setEditModal(listNumber: number, listName: string) {
    toggleEditListModal(true);
    setOpenedList(listNumber);
    setOpenedListName(listName);
  }

  function setEditNotesModal(itemId: number) {
    toggleEditNotesModal(true);
    setSelectedItem(itemId);
  }

  return (
    <>
      <ModalContext.Provider value={ModalContextValues}>
        <setListContext.Provider value={setLists}>
          <Navbar />
          <AddList />
          <ListData lists={lists} />
          {modal && <Modal />}
          {editListModal && <EditModal />}
          {editNotesModal && <EditNotesModal />}
        </setListContext.Provider>
      </ModalContext.Provider>
    </>
  );
};

export default Home;
