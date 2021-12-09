import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import './Members.css'
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

    const [Members, setMembers] = useState([]);


    useEffect(() => {
        LoadPrivileges()
    }, [])


    function AllMembers() {
        axios.get('http://localhost:4000/loadmembers')
            .then((res) => setMembers(res.data))
            .catch(err => window.alert(err))
    }

    useEffect(() => {
        AllMembers();
    }
        , [])

    async function DeleteMember(id) {
        const result = await axios.put(`http://localhost:4000/deletemember/${id}`);
        message.success("Record Deleted!")
        result.data ? AllMembers() : alert("Error");
    }
    function CancelDelete() {
        message.error("Delete Record Cancelled!")
    }
    async function UpdateFile(id) {
        redirect.push(`/updatemember/${id}`);
    }

    function ViewFiles(id) {
        redirect.push(`/files/member/${id}`);
    }


    const [UserID, setUserID] = useState(false);
    const [openPopUp, setopenPopUp] = useState(false);
    const [openMessagePopUp, setopenMessagePopUp] = useState(false);
    const [ check, setCheck]= useState();
    
    const handleClickopenPopUp = (id) => {
        setopenPopUp(!openPopUp);
        setUserID(id);
    };


    const handleMessagePopUp = (x) => {
        setopenPopUp(!openPopUp);
        setopenMessagePopUp(!openMessagePopUp);
        setCheck(x);
    };

    const [RegKey, SetRegKey] = useState({
        RegistrationKey: ""
    })

    function HandleRegistrationKey(e) {
        SetRegKey({ ...RegKey, [e.target.name]: e.target.value });
        console.log(RegKey)
    }

    async function AssignFile(id) {
        axios.put(`http://localhost:4000/assignfile/${id}`, RegKey).then((res) => {
            res.data.status === 101 ? handleMessagePopUp(1) : res.data.status === 102
                ? handleMessagePopUp(2) : res.data === true ? handleMessagePopUp(3) : handleMessagePopUp(4)
        }).catch((err) => {
            alert(err);
        })
    }


    const columns = [
        {
            field: "Picture",
            headerName: "Picture",
            type: "string",
            width: 80,
            renderCell: (params) => {
                return (
                    <>
                        <a href={`http://localhost:4000/memberpictures/${params.row.Picture}`} download>
                            <img className="avatar" src={`http://localhost:4000/memberpictures/${params.row.Picture}`} alt=""></img>
                        </a>
                    </>
                );
            },

        },
        { field: "FullName", headerName: "Full Name", type: "string", width: 120, },
        { field: "FatherName", headerName: "FatherName", type: "string", width: 120, },
        {
            field: "MembershipNo",
            headerName: "Membership No.",
            type: "string",
            width: 140,

        },
        {
            field: "CNIC",
            headerName: "CNIC",
            type: "string",
            width: 160,
            editable: false
        },
        {
            field: "PhoneNo",
            headerName: "Phone No.",
            type: "string",
            width: 130,

        },

        {
            field: "action",
            headerName: "Action",
            visibility: "hidden",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link>
                            <EditIcon visibility={`${HideEdit}`} className="userListEdit" onClick={() => UpdateFile(params.row.id)}></EditIcon>
                        </Link>
                        <Popconfirm
                            title="Are you sure to delete?"
                            onConfirm={() => DeleteMember(params.row.id)}
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
        {
            field: "file",
            headerName: "File",
            visibility: "hidden",
            width: 110,
            renderCell: (params) => {
                return (
                    <>
                        <RemoveRedEyeIcon id="ViewIcon" onClick={() => ViewFiles(params.row.id)}></RemoveRedEyeIcon>
                        <Button id="AssignButton" variant="contained" color="primary" onClick={() => handleClickopenPopUp(params.row.id)}>Assign</Button>
                    </>
                );
            },
        },

    ];

    const rows = Members && Members.map((user, index) => {
        return {
            id: user._id,
            FullName: user.FullName,
            FatherName: user.FatherName,
            MembershipNo: user.MembershipNo,
            CNIC: user.CNIC,
            PhoneNo: user.PhoneNo,
            Picture: user.Picture
        }
    })


    const classes = useStyles();

    return (
        <div className="userList">
            <Dialog open={openPopUp} onClose={handleClickopenPopUp} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{colo:"red"}}> {"Enter Registration Key"} </DialogTitle>
                <DialogContent>
                    <input type="text" placeholder="Registration Key" name="RegistrationKey" onChange={HandleRegistrationKey} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickopenPopUp}>Cancel</Button>
                    <Button id="AssignButton" variant="contained" color="primary" onClick={() => AssignFile(UserID)}>Assign</Button>
                </DialogActions>
            </Dialog>

 {/* Already Existt OR Registration Key Not Found PopUp */}

            <Dialog open={openMessagePopUp} onClose={handleMessagePopUp} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title"> {check ===1 ? "Registration No. Not Exist" 
                : check===2 ? "Already Assigned" : check===3 ? "Assigned Succesfully!" : "Error"} </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                <Button id="AssignButton" variant="contained" color="primary" onClick={handleMessagePopUp}>Ok</Button>
                </DialogActions>
            </Dialog>


            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.content}>
                    <div className={classes.toolbar}>
                        <Typography variant="h6" component="h2" color="primary">
                            Members
                        </Typography>
                        <Link to={"/newmember"}>
                            <GroupAddIcon style={{ marginRight: "20px" }} className="userListAdd"></GroupAddIcon>
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
