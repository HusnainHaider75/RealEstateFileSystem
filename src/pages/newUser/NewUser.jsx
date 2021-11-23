import "./newUser.css";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router";

export default function NewUser() {
  const redirect =useHistory();
  const LoggedInUser = JSON.parse(localStorage.getItem("auth0spajs"));
  const [User, SetUser] = useState({ RegistrationNo:"", IntinitationLetterSerial:"", 
  BookingFormSerial:"", CreatedBy:`${LoggedInUser.email}`, Detail:""});

  let name, value;
  function HandleInputs(e){
        name = e.target.name;
        value = e.target.value;
        SetUser({ ...User, [name]: value })
  }

  
  async function SubmitUser(){
    const result = await axios.post('http://localhost:4000/createuser', User);
    if (result.data) {
      redirect.push(`/users`)
    }
    else {
        redirect.push(`/newUser`)
    }
  }



  return (
    <div className="newUser">

      <div className="newUserForm">
        <div className="newUserItem">
          <label>Registration Number</label>
          <input required type="text" placeholder="john" name="RegistrationNo" onChange={(e)=>HandleInputs(e)}/>
        </div>
        <div className="newUserItem">
          <label>Intinitation Letter Serial</label>
          <input type="text" placeholder="Intinitation Letter Serial" name="IntinitationLetterSerial" onChange={(e)=>HandleInputs(e)}/>
        </div>
        <div className="newUserItem">
          <label>Booking Form Serial</label>
          <input type="text" placeholder="BookingFormSerial" name="BookingFormSerial" onChange={(e)=>HandleInputs(e)}/>
        </div>
        <div className="newUserItem">
          <label>Detail</label>
          <input type="text" placeholder="Detail" name="Detail" onChange={(e)=>HandleInputs(e)}/>
        </div>
        
        </div>
        <button className="newUserButton" onClick={()=>SubmitUser()}>Create</button>
    </div>
  );
}
