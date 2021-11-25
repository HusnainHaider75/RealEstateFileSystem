import './BookingFormSetting.css'
import * as React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import QRCode from 'qrcode';
import ClipLoader from "react-spinners/ClipLoader";


export default function QR_Code() {
  const [PageAlignment, SetPageAlignment] = useState([]);
  const { RegNo, BookingFormNo, IssueDate } = useParams();
  const [imageUrl, setImageUrl] = useState('');

  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [])


  const generateQrCode = async () => {
    try {
      const ResultedCode = await QRCode.toDataURL(`Registration=${RegNo} + BookingFormNo= ${BookingFormNo}`);
      setImageUrl(ResultedCode);
      console.log(imageUrl);

    } catch (error) {
      console.log(error);
    }
  }

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
      <div className="Booking-Background-CSS">
        {
          Loading
            ?
            <div className="UserLoader">
              <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
            </div>
            :
            <div style={{ marginLeft: "110px", marginTop: "20px" }}>
              <img src="http://localhost:4000/BookingFormBackgroundPicture.jpg" style={{ width: "550px", position: "absolute" }} />

              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" style={{
                    marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.LeftMargin}`,
                    marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.TopMargin}`,
                    position: "absolute"
                  }} />
                </a>) : null}



              <h3 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.TopMargin}`,
                position: "absolute"
              }}>{RegNo}</h3>


              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.securitykey.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.securitykey.TopMargin}`,
                position: "absolute"
              }}
              >{BookingFormNo}</h5>


              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.issuedate.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.issuedate.TopMargin}`,
                position: "absolute"
              }}
              >{IssueDate}</h5>

              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.noteserialno.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.noteserialno.TopMargin}`,
                position: "absolute"
              }}
              >{BookingFormNo}</h5>
            </div>
        }

      </div>
    </>
  );
}
