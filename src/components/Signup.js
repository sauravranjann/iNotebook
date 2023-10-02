import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Signup = (props) => {
const host = "http://localhost:5000";
const [credentials, setCredentials] = useState({ email: "", password: "" , name:"" , cpassword:""});
let navigate = useNavigate();
 const handleSubmit = async (e) => {
   e.preventDefault();
   const {name , email , password } = credentials;
   const response = await fetch(`${host}/api/auth/createuser`, { 
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },

     body: JSON.stringify({
       email,
       password,
        name
     }),
   });
   const json = await response.json();
   console.log(json);
   if (json.success) {
     // Save the auth token and redirect
     localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created Successfully" , "success")
     navigate("/home");
   }
   else{
      props.showAlert("Invalid Credentials" , "danger")
   }
 };
 const onChange = (e) => {
   setCredentials({ ...credentials, [e.target.name]: e.target.value });
 };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email1"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword "
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
