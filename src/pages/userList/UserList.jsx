import './userList.css'
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { ImFolderPlus } from "react-icons/im";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

export default function UserList() {
  const redirect = useHistory();
  const [LoadUser, setLoadUser] = useState([]);

  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [])

  function OpenIntimationLetter(RegistrationNo) {
    const type= "intimation";
    window.open(`/intimationQRCode/registration/${RegistrationNo}/type=/${type}`);

  }

  function OpenBookingLetter(RegistrationNo) {
    const type= "booking";
    window.open(`/bookingQRCode/registration/${RegistrationNo}/type=/${type}`)
  }

  function AllUserData() {
    axios.get('http://localhost:4000/loaduser')
      .then((res) => setLoadUser(res.data))
      .catch(err => window.alert(err))
  }

  useEffect(() => {
    AllUserData();
  }
    , [])

  async function DeleteUser(id) {
    const result = await axios.put(`http://localhost:4000/deleteuser/${id}`);
    message.success("Record Deleted!")
    result.data ? AllUserData() : alert("Error");
  }
  function CancelDelete() {
    message.error("Delete Record Cancelled!")
  }
  async function UpdateUser(id) {
    redirect.push(`/file/${id}`);
  }

  const columns = [
    { field: "RegistrationNo", headerName: "Registration No.", type: "string", width: 180, editable: true },
    { field: "IntinitationLetterSerial", headerName: "Intinitation Letter Serial", type: "string", width: 200, editable: true },
    {
      field: "BookingFormSerial",
      headerName: "Booking",
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
      headerName: "Intinitation",
      type: "string",
      width: 240,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link onClick={() => OpenIntimationLetter(params.row.RegistrationNo, params.row.IntinitationLetterSerial, params.row.IssueDate)}>
              <span>Intimation Letter</span>
            </Link>
          </>
        );
      }
    },
    {
      field: "BookingFormQRCode",
      headerName: "Booking Form QR-Code",
      type: "string",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>

            <Link onClick={() => OpenBookingLetter(params.row.RegistrationNo, params.row.BookingFormSerial, params.row.IssueDate)}>
              <span>Booking Form</span>
            </Link>
          </>
        );
      }
    },

    {
      field: "action",
      headerName: "Action",
      width: 190,
      renderCell: (params) => {
        return (
          <>
            <Link>
              <EditIcon className="userListEdit" onClick={() => UpdateUser(params.row.id)}></EditIcon>
            </Link>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => DeleteUser(params.row.id)}
              onCancel={() => CancelDelete()}
              okText="Yes"
              cancelText="No"
              placement="top"
            >
              <DeleteOutline className="userListDelete"></DeleteOutline>
            </Popconfirm>

          </>
        );
      },
    },
  ];

  const rows = LoadUser && LoadUser.map((user, index) => {
    return {
      id: user._id,
      RegistrationNo: user.RegistrationNo,
      BookingFormSerial: user.BookingFormSerial,
      IntinitationLetterSerial: user.IntinitationLetterSerial,
      CreatedBy: user.IssueDate,
      IssueDate: user.IssueDate
    }
  })


  return (
    <>

      <div className="userList">

        {
          Loading
            ?
            <div className="UserLoader">
              <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
            </div>
            :
            <>
              <Link to={"/newfile"}>
                <ImFolderPlus size={30} className="userListAdd"></ImFolderPlus>
              </Link>
              <DataGrid rows={rows} columns={columns} />
            </>
            
        }

      </div>
    </>
  );
}
