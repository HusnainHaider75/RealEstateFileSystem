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
    Address: "",
    Picture: ""
  });

  let name, value;
  function HandleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    SetNewMember({ ...NewMember, [name]: value });
    console.log(NewMember);
  }
  const [state, setstate] = useState({
    file: ""
  })

  function ImageInput(e) {
    setstate({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }

  function UploadImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ProfileImage', state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://localhost:4000/uploadprofileimage", formData, config)
      .then((res) => {
        SetNewMember({...NewMember, Picture: res.data});
      }).catch((error) => {
        alert(error)
      });
  }

  async function AddNewMember(){
    const result = await axios.post('http://localhost:4000/addnewmember', NewMember);
    if (result.data) {
      redirect.push(`/members`)
    }
    else {
        redirect.push(`/newmember`)
    }
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

              <div className="userUpdateItem">
                <label>Profile Picture</label>
                <input type="file" name="ProfileImage" style={{transition: "width 0.4s ease-in-out"}} onChange={ImageInput} />
                <button className="ImageUploadButton" onClick={UploadImage}>Upload</button>
              </div>
              <button className="userUpdateButton" onClick={AddNewMember}> Add </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
