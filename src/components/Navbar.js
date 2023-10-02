import React, { useEffect } from 'react'
import { Link , useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handlelogout = ()=>{
      localStorage.removeItem('token');
  navigate("/login");
    
  }
  let location = useLocation();//this is a hook which is used to get the current location of the page
  useEffect(() => {
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lampat Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                to="/home "
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          
          {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              Signup
            </Link>
          </form>:
            <Link className="btn btn-primary mx-1" onClick={handlelogout} to="/logout" role="button">
              Logout
            </Link>
            }
        </div>
      </div>
    </nav>
  );
        }

export default Navbar