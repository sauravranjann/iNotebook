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

  const [notes, setNotes] = useState(notesInitial);//this is a state object which is used to store data and setNotesState is used to set the data
  
  
  //add a note
  const addNote = (title, description, tag) => {
    const note =
      {
      _id: "6517e3b31e7792ac3dfcf893",
      user: "6517e34c1e7792ac3dfcf88d",
      title: title,
      description: description,
      tag: tag,
      date: "1696064429309",
      __v: 0,
    };
    setNotes(notes.concat(note));

};   


//delete a note
const deleteNote = (id) => {
  const newNotes = notes.filter((note) => {return note._id !== id});
  setNotes(newNotes);
}


//edit a note
const editNote = (id,title,descripton,tag) => {
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id === id){
      element.title = title;
      element.description = descripton;
      element.tag = tag;
    }
  }
}

  return (
    <NoteContext.Provider //this is a context object which is used to share data between components and value is used to pass the data
      value={{ notes,addNote,deleteNote,editNote }}>
      {props.children}  
    </NoteContext.Provider> //this is a context object which is used to share data between components and value is used to pass the data
  );//this is used to pass the data to the child components of this component and props.children is used to pass the data to the child components of this component

};
export default NoteState;
