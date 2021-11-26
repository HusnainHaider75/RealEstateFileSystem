import React from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import "./TopLeftSetting.css";
import ClipLoader from "react-spinners/ClipLoader";
export default function TopLeftSetting() {

  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [])


  const [state, setstate] = useState({
    file: ""
  })

  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://localhost:4000/uploadintimationletter", formData, config)
      .then((res) => {
        alert("The file is successfully uploaded");
      }).catch((error) => {
        alert(error)
      });
  }

  function onFormSubmit1(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('BookingFormBackgroundPicture', state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("http://localhost:4000/uploadbookingform", formData, config)
      .then((res) => {
        alert("The file is successfully uploaded");
      }).catch((error) => {
        alert(error)
      });
  }
  function ImageInput(e) {
    setstate({ file: e.target.files[0] });
  }


  const redirect = useHistory();
  const SettingOfPage = {

    intimationletter: {
      qrcode:
        { LeftMargin: "", TopMargin: "" },
      securitykey:
        { LeftMargin: "", TopMargin: "" },
      registrationkey:
        { LeftMargin: "", TopMargin: "" },
      noteserialno:
        { LeftMargin: "", TopMargin: "" },
      issuedate:
        { LeftMargin: "", TopMargin: "" },
      backgroundpicture:
        { Bg_Image: "" }
    },

    bookingform: {
      qrcode:
        { LeftMargin: "", TopMargin: "" },
      securitykey:
        { LeftMargin: "", TopMargin: "" },
      registrationkey:
        { LeftMargin: "", TopMargin: "" },
      noteserialno:
        { LeftMargin: "", TopMargin: "" },
      issuedate:
        { LeftMargin: "", TopMargin: "" },
      backgroundpicture:
        { Bg_Image: "" }
    }

  };


  let name, value;
  function HandleInputs(e, filename, key) {
    name = e.target.name;
    value = e.target.value;
    SettingOfPage[filename][key][name] = value;
    console.log(SettingOfPage);
  }

  const SubmitPageSetting = async () => {
    console.log(SettingOfPage)
    const result = await axios.post("http://localhost:4000/pagesetting", SettingOfPage);
    if (result.data) {
      redirect.push(`/users`);
    } else {
      redirect.push(`/users`);
    }
  };



  return (

    <div className="SettingPage">
      {
        Loading
          ?
          <div className="SettingLoader">
            <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
          </div>
          :
          <>

            <Grid item xs={12}>
              <div className="user">
                <div className="DisplayForm">
                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set QR Code</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">

                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            onChange={(e) => HandleInputs(e, "intimationletter", "qrcode")}

                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            onChange={(e) => HandleInputs(e, "intimationletter", "qrcode")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Registration No.</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            onChange={(e) => HandleInputs(e, "intimationletter", "registrationkey")}
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            onChange={(e) => HandleInputs(e, "intimationletter", "registrationkey")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="DisplayForm">
                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Security Key</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="2"
                            onChange={(e) => HandleInputs(e, "intimationletter", "securitykey")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="2"
                            onChange={(e) => HandleInputs(e, "intimationletter", "securitykey")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Issue Date</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="3"
                            onChange={(e) => HandleInputs(e, "intimationletter", "issuedate")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="3"
                            onChange={(e) => HandleInputs(e, "intimationletter", "issuedate")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="DisplayForm">
                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Note Serial No.</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="4"
                            onChange={(e) => HandleInputs(e, "intimationletter", "noteserialno")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="4"
                            onChange={(e) => HandleInputs(e, "intimationletter", "noteserialno")}
                          />
                        </div>
                      </div>
                    </div>

                    <br /><br />
                  </div>

                  <Grid item xs={6}>
                    <div >
                      <form onSubmit={onFormSubmit}>
                        <div className="intimationletteruploadfile">
                          <input type="file" name="BackgroundImage" onChange={ImageInput} />
                          <button type="submit">Upload</button>
                        </div>
                      </form>
                    </div>
                    <button className="userUpdateButton" onClick={() => SubmitPageSetting()}>Update</button>
                  </Grid>

                </div>


                {/* Booking Form Setting */}
                <div className="DisplayForm">

                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set QR Code</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">

                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            onChange={(e) => HandleInputs(e, "bookingform", "qrcode")}

                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            onChange={(e) => HandleInputs(e, "bookingform", "qrcode")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Registration No.</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            onChange={(e) => HandleInputs(e, "bookingform", "registrationkey")}

                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            onChange={(e) => HandleInputs(e, "bookingform", "registrationkey")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="DisplayForm">
                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Security Key</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="2"
                            onChange={(e) => HandleInputs(e, "bookingform", "securitykey")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="2"
                            onChange={(e) => HandleInputs(e, "bookingform", "securitykey")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Issue Date</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="3"
                            onChange={(e) => HandleInputs(e, "bookingform", "issuedate")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="3"
                            onChange={(e) => HandleInputs(e, "bookingform", "issuedate")}
                          />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="DisplayForm">
                  <div className="DisplayMargin">
                    <span className="userUpdateTitle">Set Note Serial No.</span>
                    <div className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Left Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="LeftMargin"
                            id="4"
                            onChange={(e) => HandleInputs(e, "bookingform", "noteserialno")}
                          />
                        </div>
                        <div className="userUpdateItem">

                          <label>Top Margin</label>
                          <input
                            type="text"
                            className="userUpdateInput"
                            name="TopMargin"
                            id="4"
                            onChange={(e) => HandleInputs(e, "bookingform", "noteserialno")}
                          />
                        </div>
                      </div>
                    </div>

                    <br /><br />
                  </div>
                  <Grid>
                    <form onSubmit={onFormSubmit1}>
                      <input type="file" name="BackgroundImage" onChange={ImageInput} />
                      <button type="submit">Upload</button>
                    </form>
                  </Grid>
                </div>

              </div>

            </Grid>

          </>

      }


    </div>
  );
}









