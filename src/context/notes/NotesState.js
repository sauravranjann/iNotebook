import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {//this is a state object which is used to store data
  const notesInitial = [
    {
      _id: "6517e3ad1e7792ac3dfcf891",
      user: "6517e34c1e7792ac3dfcf88d",
      title: "Saurav jiiii new jii",
      description: "Utssha jaii badwe jii",
      tag: "ji sir",
      date: "1696064429309",
      __v: 0,
    },
    {
      _id: "6517e3b31e7792ac3dfcf893",
      user: "6517e34c1e7792ac3dfcf88d",
      title: "Saurav jiiii new jii",
      description: "Utssha jaii badwe jii",
      tag: "ji sir",
      date: "1696064429309",
      __v: 0,
    },
  ];

  const [notesState, setNotesState] = useState(notesInitial);//this is a state object which is used to store data and setNotesState is used to set the data

  return (
    <NoteContext.Provider //this is a context object which is used to share data between components and value is used to pass the data
      value={{ notes: notesState, setNotes: setNotesState }}>
      {props.children}  
    </NoteContext.Provider> //this is a context object which is used to share data between components and value is used to pass the data
  );//this is used to pass the data to the child components of this component and props.children is used to pass the data to the child components of this component

};
export default NoteState;
