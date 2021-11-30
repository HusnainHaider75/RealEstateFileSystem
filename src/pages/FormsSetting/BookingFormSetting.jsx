import './BookingFormSetting.css'
import * as React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import QRCode from 'qrcode';
import ClipLoader from "react-spinners/ClipLoader";


export default function QR_Code(props) {
  const [PageAlignment, SetPageAlignment] = useState([]);
  const { RegNo } = useParams();
  const [imageUrl, setImageUrl] = useState('');

  props.NewState(false);
  
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [])


  const generateQrCode = async () => {
    let type= "booking";
    try {
      const ResultedCode = await QRCode.toDataURL(`http://localhost:3000/QRCode/RegNo/${RegNo}/type/${type}`);
      setImageUrl(ResultedCode);

    } catch (error) {
      console.log(error);
    }
  }


  
  const [FileData, SetFileData] = useState([]);

  const LoadFileDetail = async (RegNo) => {

    const result = await axios.get(
      `http://localhost:4000/loadfiledata/${RegNo}`
    );
    if (result) {
      SetFileData(result && result.data && result.data);
    } else {
      alert("Error!");
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
    generateQrCode();
    LoadPageSetting();
    LoadFileDetail(RegNo);
    
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
              <img src="http://localhost:4000/BookingFormBackgroundPicture.jpg" alt='' style={{ width: "550px", position: "absolute" }} />

              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" width="80" height="90"
                   style={{
                    marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.LeftMargin}`,
                    marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.qrcode.TopMargin}`,
                    position: "absolute"
                  }} />
                </a>) : null}



              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.registrationkey.TopMargin}`,
                position: "absolute"
              }}>{RegNo}</h5>


              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.securitykey.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.securitykey.TopMargin}`,
                position: "absolute"
              }}
              >{FileData && FileData.BookingFormSerial}</h5>


              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.issuedate.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.issuedate.TopMargin}`,
                position: "absolute"
              }}
              >{FileData && FileData.IssueDate}</h5>

              <h5 style={{
                marginLeft: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.noteserialno.LeftMargin}`,
                marginTop: `${PageAlignment && PageAlignment.bookingform && PageAlignment.bookingform.noteserialno.TopMargin}`,
                position: "absolute"
              }}
              >{FileData && FileData.BookingFormSerial}</h5>
            </div>
        }

      </div>
    </>
  );
}
