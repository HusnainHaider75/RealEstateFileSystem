import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ImFolderPlus } from "react-icons/im";
import { DataGrid } from "@mui/x-data-grid";
import './FileList.css'
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
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
    const { id } = useParams();

    const [HideDelete, SetHideDelete] = useState("hidden");
    const [HideEdit, SetHideEdit] = useState("hidden");

    function LoadPrivileges() {
        const permissions = JSON.parse(localStorage.getItem("Permissions"))
        console.log(permissions);
        permissions.map((privilege, index) => {
            if (privilege === 'admin') {
                SetHideDelete("visible");
                console.log(id)
            }
            if (privilege === 'admin') {
                SetHideEdit("visible");
                console.log(id);
            }
        })
    }

    const redirect = useHistory();
    if (!localStorage.getItem("auth0spajs")) {
        redirect.push("/")
    }

    const [LoadFile, setLoadFile] = useState([]);
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

    function AllFileData() {
        console.log(id)
        if (id) {
            console.log(id);
            axios.get(`http://localhost:4000/loadfiles/${id}`)
                .then((res) => setLoadFile(res.data))
                .catch(err => window.alert(err))
        }
        else {
            axios.get('http://localhost:4000/loadfiles')
                .then((res) => setLoadFile(res.data))
                .catch(err => window.alert(err))
        }
    }

    useEffect(() => {
        AllFileData();
    }
        , [])

    async function DeleteFile(id) {
        const result = await axios.put(`http://localhost:4000/deletefile/${id}`);
        message.success("Record Deleted!")
        result.data ? AllFileData() : alert("Error");
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
                            onConfirm={() => DeleteFile(params.row.id)}
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

    const rows = LoadFile && LoadFile.map((File, index) => {

        return {
            id: File._id,
            RegistrationNo: File.RegistrationNo,
            BookingFormSerial: File.BookingFormSerial,
            IntinitationLetterSerial: File.IntinitationLetterSerial,
            CreatedBy: File.IssueDate,
            IssueDate: File.IssueDate
        }
    })

    const classes = useStyles();

    return (
        <div className="userList">
            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.content}>
                    <div className={classes.toolbar}>
                        <Typography variant="h6" component="h2" color="primary">
                            Files
                        </Typography>
                        <Link to={"/newfile"}>
                            <ImFolderPlus size={30} className="FileListAdd"></ImFolderPlus>
                        </Link>
                    </div>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </Paper>
            </div>
        </div>
    );
}
