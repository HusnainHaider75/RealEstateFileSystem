import "./UpdateMember.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
export default function UpdateMember() {

  const redirect = useHistory();
  if (!localStorage.getItem("auth0spajs")) {
    redirect.push("/")
  }

  const { id } = useParams();
  const [UpdateMember, SetUpdateMember] = useState({
    FullName: "",
    FatherName: "",
    MembershipNo: "",
    CNIC: "",
    PhoneNo: "",
    Address: "",
    Picture: ""
  });

  function LoadMembers() {
    axios.get(`http://localhost:4000/loadonemember/${id}`).then((res) => SetUpdateMember(res.data)).catch(err => window.alert(err));
  }

  useEffect(() => {
    LoadMembers();
  }, [])

  let name, value;
  function HandleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    SetUpdateMember({ ...UpdateMember, [name]: value })
    console.log(UpdateMember);
  }


  function SubmitUpdateMember(id) {
    axios.put(`http://localhost:4000/updatemember/${id}`, UpdateMember)
      .then(() => redirect.push('/members'))
      .catch(err => window.alert(err));
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
        SetUpdateMember({...UpdateMember, Picture: res.data});
      }).catch((error) => {
        alert(error)
      });
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
                  value={UpdateMember.FullName}
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
                  value={UpdateMember.FatherName}
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Membership No.</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  name="MembershipNo"
                  value={UpdateMember.MembershipNo}
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>CNIC</label>
                <input
                  type="number"
                  className="userUpdateInput"
                  name="CNIC"
                  value={UpdateMember.CNIC}
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
                  value={UpdateMember.PhoneNo}
                  onChange={(e) => HandleInputs(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="address"
                  className="userUpdateInput"
                  name="Address"
                  value={UpdateMember.Address}
                  onChange={(e) => HandleInputs(e)}
                />
              </div>

              <div className="userUpdateItem">
                <label>Profile Picture</label>
                <input type="file" name="ProfileImage" onChange={ImageInput}  />
                <button className="ImageUploadButton" onClick={UploadImage}>Upload</button>
              </div>
              <button className="userUpdateButton" onClick={()=>SubmitUpdateMember(UpdateMember._id)}> Update </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
