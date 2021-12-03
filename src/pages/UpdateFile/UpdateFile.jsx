import {
  Publish,
} from "@material-ui/icons";
import "./UpdateFile.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
export default function User() {

  const redirect =useHistory();
  if(!localStorage.getItem("auth0spajs")){
    redirect.push("/")
  }

  const {id}= useParams();
  const [UpdatedUser, SetUpdatedUser] =useState({ RegistrationNo:"", IntinitationLetterSerial:"", 
  BookingFormSerial:"", Detail:""});

  function LoadUserData(){
    axios.get(`http://localhost:4000/loaduser/${id}`).then((res) => SetUpdatedUser(res.data)).catch(err => window.alert(err));
  }

  useEffect(() => {
    LoadUserData();
  }, [])

  let name, value;
  function HandleInputs(e){
        name = e.target.name;
        value = e.target.value;
        SetUpdatedUser({ ...UpdatedUser, [name]: value })
        console.log(UpdatedUser);
  }


  function UpdateUser(id){
    axios.put(`http://localhost:4000/updateuser/${id}`, UpdatedUser)
    .then(() =>redirect.push('/files'))
    .catch(err => window.alert(err));
  }

  return (
    <>
        <div className="user">  
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Registration No</label>
                <input
                  type="text"
                  placeholder="Registration No"
                  className="userUpdateInput"
                  name="RegistrationNo"
                  value={UpdatedUser.RegistrationNo}
                  onChange={(e)=>HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Intinitation Letter Serial</label>
                <input
                  type="text"
                  placeholder="Intinitation Letter Serial"
                  className="userUpdateInput"
                  name="IntinitationLetterSerial"
                  value={UpdatedUser.IntinitationLetterSerial}
                  onChange={(e)=>HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Booking Form Serial</label>
                <input
                  type="text"
                  placeholder="Booking Form Serial"
                  className="userUpdateInput"
                  name="BookingFormSerial"
                  value={UpdatedUser.BookingFormSerial}
                  onChange={(e)=>HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Detail</label>
                <input
                  type="text"
                  placeholder="Detail"
                  className="userUpdateInput"
                  name="Detail"
                  value={UpdatedUser.Detail}
                  onChange={(e)=>HandleInputs(e)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <label htmlFor="file">
                </label>
              </div>
              <button className="userUpdateButton" onClick={()=>UpdateUser(id)}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
