import './BookingFormSetting.css'
import * as React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import QRCode from 'qrcode';


export default function QR_Code() {
  const [PageAlignment, SetPageAlignment] = useState([]);
  const { RegNo, BookingFormNo}=useParams();
  const [imageUrl, setImageUrl] = useState('');
  const generateQrCode = async () => {
    try {
          const ResultedCode = await QRCode.toDataURL(`Registration=${RegNo} + BookingFormNo= ${BookingFormNo}`);
          setImageUrl(ResultedCode);
          console.log(imageUrl);
          
    }catch (error) {
      console.log(error);
    }
  }

  const LoadPageSetting = async () => {
    const PageSettingLoaded = await axios.get(
      "http://localhost:4000/loadpagesetting"
    );
    if (PageSettingLoaded) {
      let temp =  PageSettingLoaded && PageSettingLoaded.data[0] && PageSettingLoaded.data[0].PageSettingString
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

      <h3 style={{
            marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.TopMargin}`
          }}>{RegNo}</h3>
      <br/>
        {imageUrl ? (
              <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" style={{
            marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.LeftMargin}`,
            marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.TopMargin}`
          }}/>
              </a>) : null}
        
    </div>
    </>
  );
}
