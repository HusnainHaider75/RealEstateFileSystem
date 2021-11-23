import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  styled,
} from "@material-ui/core";
import {
  Publish,
} from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./TopLeftSetting.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TopLeftSetting() {
  const redirect = useHistory();

  const [SettingOfPage, SetSettingOfPage] = useState({

    intimationletter:{
                    qrcode : 
                      { 
                          LeftMargin: "",
                          TopMargin: ""
                      },
                  securitykey : 
                      { 
                          LeftMargin: "",
                          TopMargin: ""
                      },
                  registrationkey : 
                      { 
                          LeftMargin: "",
                          TopMargin: ""
                      },
                  noteserialno : 
                      { 
                          LeftMargin: "",
                          TopMargin: ""
                      },
                  issuedate : 
                      { 
                          LeftMargin: "",
                          TopMargin: ""
                      },
                  backgroundpicture :
                      {
                        Bg_Image: ""
                      }
    },


    bookingform:{
                  qrcode : 
                    { 
                        LeftMargin: "",
                        TopMargin: ""
                    },
                securitykey : 
                    { 
                        LeftMargin: "",
                        TopMargin: ""
                    },
                registrationkey : 
                    { 
                        LeftMargin: "",
                        TopMargin: ""
                    },
                noteserialno : 
                    { 
                        LeftMargin: "",
                        TopMargin: ""
                    },
                issuedate : 
                    { 
                        LeftMargin: "",
                        TopMargin: ""
                    },
                backgroundpicture :
                    {
                        Bg_Image: ""
                    }
    }
    
  });


  let name, value;
  function HandleInputs(e, filename, key) {
    name = e.target.name;
    value = e.target.value;
    SettingOfPage[filename][key][name]=value ;
    console.log(SettingOfPage);
  }

  const SubmitPageSetting = async () => {
    console.log(SettingOfPage)
    const result = await axios.post("http://localhost:4000/pagesetting",SettingOfPage);
    // if (result.data) {
    //   redirect.push(`/users`);
    // } else {
    //   redirect.push(`/users`);
    // }
  };

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
                      onChange={(e) => HandleInputs(e,"intimationletter", "registrationkey")}

                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Top Margin</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      name="TopMargin"
                      onChange={(e) => HandleInputs(e,"intimationletter", "registrationkey")}
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
                      onChange={(e) => HandleInputs(e,"intimationletter", "securitykey")}
                    />
                  </div>
                  <div className="userUpdateItem">

                    <label>Top Margin</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      name="TopMargin"
                      id="2"
                      onChange={(e) => HandleInputs(e,"intimationletter", "securitykey")}
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
                      onChange={(e) => HandleInputs(e,"intimationletter", "issuedate")}
                    />
                  </div>
                  <div className="userUpdateItem">

                    <label>Top Margin</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      name="TopMargin"
                      id="3"
                      onChange={(e) => HandleInputs(e,"intimationletter", "issuedate")}
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
                      onChange={(e) => HandleInputs(e,"intimationletter", "noteserialno")}
                    />
                  </div>
                  <div className="userUpdateItem">

                    <label>Top Margin</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      name="TopMargin"
                      id="4"
                      onChange={(e) => HandleInputs(e,"intimationletter", "noteserialno")}
                    />
                  </div>
                </div>            
              </div>

            <br/><br/>
          </div>

          <Grid item xs={6}>
              <div className="updateBoxStyle">
                      <label htmlFor="file">
                      <Publish /> 
                      UPLOAD FILE
                      </label>
                      <br/>
                      <br/>
                      <input type="file" id="file" style={{ display: "none" }} />
                      <button className="userUpdateButton" onClick={()=>SubmitPageSetting()}>Update</button>
              </div>
          </Grid>   


            </div>

        </div>



      </Grid>



    </div>
  );
}









