import React from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Notesitems from './NotesItems';
const Notes = () => {
  const context = useContext(noteContext); //this is a context object which is used to share data between components and useContext is used to get the data
  const { notes } = context; //it destructures the data from the context object means it gets the data from the context object
  return (
    <div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          //this is used to iterate over the notes array
          return <Notesitems key={note._id } note={note}/>; //this is used to return the Notesitems component
        })}
      </div>
    </div>
  );
}

export default Notes