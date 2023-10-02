import React from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";



const NotesItems = (props) => {
    const context = useContext(noteContext); //this is a context object which is used to share data between components and useContext is used to get the data
    const { deleteNote } = context; //it destructures the data from the context object means it gets the data from the context object
    const {note,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i className="fas fa-trash-alt mx-2" onClick={ ()=>{deleteNote(note._id); props.showAlert("deleted successfully", "success");}} ></i>
            <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
           </div>
            <p className="card-text">{note.description}</p>
          
        </div>
      </div>
    </div>
  );
}

export default NotesItems