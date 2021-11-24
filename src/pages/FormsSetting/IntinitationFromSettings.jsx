import "./IntinitationFromSettings.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import QRCode from "qrcode";
import axios from "axios";
export default function QR_Code() {
  const { RegNo, IntinitationFromNo } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [PageAlignment, SetPageAlignment] = useState([]);

  const generateQrCode = async () => {
    try {
      const ResultedCode = await QRCode.toDataURL(
        `Registration=${RegNo} + IntinitationLetterSerial= ${IntinitationFromNo}`
      );
      setImageUrl(ResultedCode);
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const LoadPageSetting = async () => {
    const PageSettingLoaded = await axios.get(
      "http://localhost:4000/loadpagesetting"
    );
    if (PageSettingLoaded) {
      let temp = PageSettingLoaded && PageSettingLoaded.data[0] && PageSettingLoaded.data[0].PageSettingString
      SetPageAlignment(JSON.parse(temp));
    } else {
      alert("Error!");
    }
  };

  useEffect(() => {
    LoadPageSetting();
    generateQrCode();
  }, []);


  return (
    <>
      <div className="Intimation-Background-CSS" >
        <div >
            {imageUrl ? (
              <a href={imageUrl} download>
                <img src={imageUrl} alt="img" width="120" height="130"
                  style={{
                    marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.qrcode.LeftMargin}`,
                    marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.qrcode.TopMargin}`,
                    position: "absolute"
                  }}
                />
              </a>
            ) : null}

            <h5 style={{
              marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.registrationkey.LeftMargin}`,
              marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.registrationkey.TopMargin}`,
              position: "absolute"

            }}
            >{RegNo}</h5>
      

          <h5 style={{
            marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.securitykey.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.securitykey.TopMargin}`,
            position: "absolute"
          }}
          >{IntinitationFromNo}</h5>


          <h5 style={{
            marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.issuedate.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.issuedate.TopMargin}`,
            position: "absolute"
          }}
          >24-11-2021</h5>


          <h5 style={{
            marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.noteserialno.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.noteserialno.TopMargin}`,
            position: "absolute"
          }}
          >{IntinitationFromNo}</h5>

        </div>
      </div>
    </>
  );
}
