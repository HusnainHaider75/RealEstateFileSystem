import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import './Members.css'
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2)
    },
    content: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));




export default function MyApp() {

    const [HideDelete, SetHideDelete] = useState("hidden");
    const [HideEdit, SetHideEdit] = useState("hidden");

    function LoadPrivileges() {
        const permissions = JSON.parse(localStorage.getItem("Permissions"))
        console.log(permissions);
        permissions.map((privilege, index) => {
            if (privilege === 'admin') {
                SetHideDelete("visible");
            }
            if (privilege === 'admin') {
                SetHideEdit("visible");
            }

        })
    }
    const redirect = useHistory();
    if (!localStorage.getItem("auth0spajs")) {
        redirect.push("/")
    }

    const [LoadUser, setLoadUser] = useState([]);
    const [Loading, SetLoading] = useState(false);

    useEffect(() => {
        LoadPrivileges();
        SetLoading(true);
        setTimeout(() => {
            SetLoading(false);
        }, 2000);
    }, [])

    function OpenIntimationLetter(RegistrationNo) {
        const type = "intimation";
        window.open(`/intimationQRCode/registration/${RegistrationNo}/type/${type}`);

    }

    function OpenBookingLetter(RegistrationNo) {
        const type = "booking";
        window.open(`/bookingQRCode/registration/${RegistrationNo}/type/${type}`)
    }

    function AllUserData() {
        axios.get('http://localhost:4000/loadfiles')
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
    async function UpdateFile(id) {
        redirect.push(`/updatefile/${id}`);
    }
    const columns = [
        { field: "RegistrationNo", headerName: "Registration No.", type: "string", width: 140, editable: true },
        { field: "IntinitationLetterSerial", headerName: "Intimation Serial", type: "string", width: 140, editable: true },
        {
            field: "BookingFormSerial",
            headerName: "Booking Serial",
            type: "string",
            width: 140,
            editable: true
        },
        {
            field: "IssueDate",
            headerName: "Issue Date",
            type: "string",
            width: 120,
            editable: false
        },
        {
            field: "IntinitationLetterSerialQRCode",
            headerName: "Intimation Form",
            type: "string",
            width: 140,
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
            headerName: "Booking Form",
            type: "string",
            width: 140,
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
            visibility: "hidden",
            width: 110,
            renderCell: (params) => {
                return (
                    <>
                        <Link>
                            <EditIcon visibility={`${HideEdit}`} className="userListEdit" onClick={() => UpdateFile(params.row.id)}></EditIcon>
                        </Link>
                        <Popconfirm
                            title="Are you sure to delete?"
                            onConfirm={() => DeleteUser(params.row.id)}
                            onCancel={() => CancelDelete()}
                            okText="Yes"
                            cancelText="No"
                            placement="top"
                        >
                            <DeleteOutline visibility={`${HideDelete}`} className="userListDelete"></DeleteOutline>
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


    const classes = useStyles();

    return (
        <div className="userList">
            {
                Loading
                    ?
                    <div className="HomeLoader">
                        <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
                    </div>
                    :
                    <div className={classes.root}>
                        <CssBaseline />
                        <Paper className={classes.content}>
                            <div className={classes.toolbar}>
                                <Typography variant="h6" component="h2" color="primary">
                                    Members
                                </Typography>
                                <Link to={"/newmember"}>
                                    <GroupAddIcon style={{marginRight:"20px"}} className="userListAdd"></GroupAddIcon>
                                </Link>
                            </div>
                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid rows={rows} columns={columns} />
                            </div>
                        </Paper>
                    </div>
            }        </div>
    );
}
