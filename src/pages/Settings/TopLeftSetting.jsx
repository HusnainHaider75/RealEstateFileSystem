import React from "react";
import { Grid } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import { useHistory } from "react-router";
import axios from "axios";
import "./TopLeftSetting.css";

export default function TopLeftSetting() {
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

    if (e.target.files) {
      let file = e.target.fies[0];
      console.log(file)
    }
    name = e.target.name;
    value = e.target.value;
    console.log(e.target.file)
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

  const FileEventHanlder = async (e) => {
    console.log(e.target.files[0])
  }




  return (


    <div className="SettingPage">

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
            <div className="updateBoxStyle">
                <br />
                <br />
                <input type="file" name="file" onChange={(e) => FileEventHanlder(e)} />
                <button className="userUpdateButton" onClick={() => SubmitPageSetting()}>Update</button>
              </div>
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

            <Grid item xs={6}>
              <div className="updateBoxStyle">
                <br />
                <br />
                <input type="file" name="file" onChange={(e) => FileEventHanlder(e)} />
                <button className="userUpdateButton" onClick={() => SubmitPageSetting()}>Update</button>
              </div>
            </Grid>

          </div>

        </div>

      </Grid>

    </div>
  );
}









