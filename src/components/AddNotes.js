import React from "react";
import { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";


const AddNotes = () => {
  const context = useContext(noteContext); //this is a context object which is used to share data between components and useContext is used to get the data
  const { addNote } = context; //it destructures the data from the context object means it gets the data from the context object
  
  const [note, setNote] = useState({ title: "", description: "", tag: "" });//this is a state object which is used to store data and setNote is used to set the data

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag= "personal");
  }
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,

    });
  };
  
  
  
  
  
  return (
    <div>
      <div className="container">
        <h2>add a note</h2>
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={onChange}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
