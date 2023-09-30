import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NotesState";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
