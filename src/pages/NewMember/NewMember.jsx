import {
  Publish,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import './NewMember.css'
export default function User() {

  const redirect = useHistory();
  if (!localStorage.getItem("auth0spajs")) {
    redirect.push("/")
  }

  const [NewMember, SetNewMember] = useState({
    FullName: "",
    FatherName: "",
    MembershipNo: "",
    CNIC: "",
    PhoneNo: "",
  });



  let name, value;
  function HandleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    SetNewMember({ ...NewMember, [name]: value })
    console.log(NewMember);
  }


  function AddMember(id) {
    axios.put(`http://localhost:4000/AddMember`, NewMember)
      .then(() => redirect.push('/members'))
      .catch(err => window.alert(err));
  }

  return (
    <>
      <div className="user">
        <div className="userUpdate">
          <span className="userUpdateTitle">Add Member</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"

                  className="userUpdateInput"
                  name="RegistrationNo"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Father Name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="IntinitationLetterSerial"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Membership No.</label>
                <input
                  type="text"


                  className="userUpdateInput"
                  name="BookingFormSerial"

                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>CNIC</label>
                <input
                  type="text"

                  className="userUpdateInput"
                  name="Detail"

                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              
            </div>
            <div className="userUpdateRight">

            <div className="userUpdateItem">
                <label>Phone No.</label>
                <input
                  type="tel"
                  className="userUpdateInput"
                  name=""
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="address"
                  className="userUpdateInput"
                  name="address"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={() => AddMember()}> Add </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
