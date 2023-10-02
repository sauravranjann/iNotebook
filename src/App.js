import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NotesState";
import Alerts from "./components/Alerts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";


function App() {
 const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route
                exact
                path="/home"
                element={<Home showAlert={showAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>  
    </>
  );
}

export default App;
