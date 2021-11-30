import "./NewFile.css";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router";

export default function NewUser() {
  const redirect = useHistory();
  if(!localStorage.getItem("auth0spajs")){
    redirect.push("/")
  }
  
  const LoggedInUser = JSON.parse(localStorage.getItem("auth0spajs"));
  const [file, Setfile] = useState({ RegistrationNo:"", IntinitationLetterSerial:"", 
  BookingFormSerial:"", CreatedBy:`${LoggedInUser.email}`, Detail:"", IssueDate:""});

  let name, value;
  function HandleInputs(e){
        name = e.target.name;
        value = e.target.value;
        Setfile({ ...file, [name]: value })
  }

  
  async function Submitfile(){
    let today = new Date();
    file.IssueDate =  today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    const result = await axios.post('http://localhost:4000/createfile', file);
    if (result.data) {
      redirect.push(`/files`)
    }
    else {
        redirect.push(`/newfile`)
    }
  }



  return (
    <div className="newfile">
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
        <button className="newUserButton" onClick={()=>Submitfile()}>Create</button>
    </div>
  );
}
