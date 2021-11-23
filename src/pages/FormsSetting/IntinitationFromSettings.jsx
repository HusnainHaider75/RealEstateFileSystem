import "./IntinitationFromSettings.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import QRCode from "qrcode";
import axios from "axios";
import BackGroundImg from "../FormsSetting/Background_Image.jpg";
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
      let temp = PageSettingLoaded.data[0].PageSettingString
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
      <div className="Intimation-Background-CSS ">
        <div >
          <h3 style={{
            marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.registrationkey.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.registrationkey.TopMargin}`
          }}

           >{RegNo}</h3>

          {imageUrl ? (
            <a href={imageUrl} download>
              <img src={imageUrl} alt="img" width="170" height="190"
              style={{
                marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.qrcode.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.qrcode.TopMargin}`
              }}
              />
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
