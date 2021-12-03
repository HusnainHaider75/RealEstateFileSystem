import {
  Publish,
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
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
    Picture: ""
  });

  let name, value;
  function HandleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    SetNewMember({ ...NewMember, [name]: value });
    console.log(NewMember);
  }
  function ImageInput(e) {
    SetNewMember({ Picture: e.target.files[0] });
}

  function AddMember(e) {
    e.preventDefault();
    const NewMemberData = new FormData();
    NewMemberData.append('Picture', NewMember.Picture);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post(`http://localhost:4000/addnewmember`, NewMemberData, config)
      .then(() => redirect.push('/members'))
      .catch(err => window.alert(err));
  }

  return (
    <>
      <div className="user">
        <div className="userUpdate">
        <form onSubmit={(e)=>AddMember(e)}>
          <span className="userUpdateTitle">Add Member</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="FullName"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Father Name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="FatherName"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Membership No.</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="MembershipNo"

                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>CNIC</label>
                <input
                  type="number"
                  className="userUpdateInput"
                  name="CNIC"
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
                  name="PhoneNo"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="address"
                  className="userUpdateInput"
                  name="Address"
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="http://localhost:4000/memberpictures/file1638537593274.png"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" name="Picture" onChange={ImageInput} style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" type="submit"> Add </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
