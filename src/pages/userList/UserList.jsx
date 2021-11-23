import './userList.css'
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { ImFolderPlus } from "react-icons/im";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function UserList() {

  const redirect = useHistory();
  const [LoadUser, setLoadUser] = useState([]);


  function OpenIntimationLetter(RegistrationNo , IntinitationLetterSerial){

    window.open(`/users/QRCode/RegNo/${RegistrationNo}/IntinitationNo/${IntinitationLetterSerial}`)
  }

  function OpenBookingLetter(RegistrationNo , BookingFormSerial){
    window.open()
  }

  function AllUserData(){
    axios.get('http://localhost:4000/loaduser')
    .then((res) => setLoadUser(res.data))
    .catch(err => window.alert(err))
  }

  useEffect(() => {
    AllUserData();
    }
  , [])

  async function DeleteUser(id){
    const result =await axios.put(`http://localhost:4000/deleteuser/${id}`);
    result.data ? AllUserData() : alert("Error");
  }

  async function UpdateUser(id) {
    redirect.push(`/user/${id}`);
  }

  const columns = [
    { field: "RegistrationNo", headerName: "Registration No.",type:"string", width: 180, editable: true },
    { field: "IntinitationLetterSerial", headerName: "Intinitation Letter Serial", type: "string", width: 200, editable: true },
    {
      field: "BookingFormSerial",
      headerName: "Booking Form Serial",
      type: "string",
      width: 190,
      editable: true
    },
    {
      field: "CreatedBy",
      headerName: "Created By",
      type: "string",
      width: 200,
      editable: false
    },
    {
      field: "IntinitationLetterSerialQRCode",
      headerName: "Intinitation Letter QR-Code",
      type: "string",
      width: 160,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={`/users/QRCode/RegNo/${params.row.RegistrationNo}/IntinitationNo/${params.row.IntinitationLetterSerial}`}>
            <span>Link 1</span>
            </Link>  */}
            <Link onClick={()=>OpenIntimationLetter(params.row.RegistrationNo, params.row.IntinitationLetterSerial)}>
            <span>A</span>
            </Link> 
          </>
        );
      }
    },
    {
      field: "BookingFormQRCode",
      headerName: "Booking Form QR-Code",
      type: "string",
      width: 160,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/QRCode/RegNo/${params.row.RegistrationNo}/BookingFormNo/${params.row.BookingFormSerial}`}>
            <span>Link 2</span>
            </Link>  
            {/* <Link onClick={()=>OpenBookingLetter(params.row.RegistrationNo, params.row.BookingFormSerial)}>
            <span>B</span>
            </Link>  */}
          </>
        );
      }
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link>
            <EditIcon className="userListEdit" onClick={()=>UpdateUser(params.row.id)}></EditIcon>
            </Link>
            
            <DeleteOutline className="userListDelete" onClick={()=>DeleteUser(params.row.id)}></DeleteOutline>
              
            
          </>
        );
      },
    },
  ];
  
  const rows = LoadUser && LoadUser.map((user,index)=>{
     return {
        id: user._id,
        RegistrationNo: user.RegistrationNo,
        BookingFormSerial: user.BookingFormSerial,
        IntinitationLetterSerial: user.IntinitationLetterSerial,
        CreatedBy: user.CreatedBy
      }
    })
  

  return (
    <>
    <div className="userList">
    <Link to={"/newUser"}>
        <ImFolderPlus size={30} className="userListAdd"></ImFolderPlus>
    </Link>
      <DataGrid rows={rows} columns={columns} />

    </div>
    </>
  );
}
