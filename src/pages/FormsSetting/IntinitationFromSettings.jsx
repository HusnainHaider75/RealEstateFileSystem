import "./IntinitationFromSettings.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import QRCode from "qrcode";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";



export default function QR_Code(props) {

  props.NewState(false);

  const { RegNo, type } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [PageAlignment, SetPageAlignment] = useState([]);

  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [])


  const generateQrCode = async () => {
    let type= "intimation";
    try {
      const ResultedCode = await QRCode.toDataURL(`http://localhost:3000/QRCode/registration/${RegNo}/type/${type}`
      );
      setImageUrl(ResultedCode);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="IntimationLetter">
        {
          Loading
            ?
            <div className="UserLoader">
              <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
            </div>
            :
            <>
              <div style={{ margin: "30px" }} >
                <img src="http://localhost:4000/IntimationBackgroundPicture.jpg" style={{ width: "550px", position: "absolute" }} />
                <div >
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img src={imageUrl} alt="img" width="80" height="90"
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
                  >{FileData && FileData.IntinitationLetterSerial}</h5>


                  <h5 style={{
                    marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.issuedate.LeftMargin}`,
                    marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.issuedate.TopMargin}`,
                    position: "absolute"
                  }}
                  >{FileData && FileData.IssueDate}</h5>


                  <h5 style={{
                    marginLeft: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.noteserialno.LeftMargin}`,
                    marginTop: `${PageAlignment && PageAlignment.intimationletter && PageAlignment.intimationletter.noteserialno.TopMargin}`,
                    position: "absolute"
                  }}
                  >{FileData && FileData.IntinitationLetterSerial}</h5>

                </div>
              </div>


            </>
        }

      </div>
    </>
  );
}
