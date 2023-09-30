import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NotesState";
import Alerts from "./components/Alerts";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alerts message="ok jagye ja yr ab bhi time h"  />
        <div className="container my-3">
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
