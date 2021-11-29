import React from "react"
import { useState, useEffect } from "react"
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";
import axios from "axios";
import './temp.css'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Temp() {

    const [Loading, SetLoading] = useState(false);

    useEffect(() => {
        SetLoading(true);
        setTimeout(() => {
            SetLoading(false);
        }, 2000);
    }, [])


    const [state, setstate] = useState({
        file: ""
    })

    function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:4000/uploadintimationletter", formData, config)
            .then((res) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
                alert(error)
            });
    }

    function onFormSubmit1(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('BookingFormBackgroundPicture', state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:4000/uploadbookingform", formData, config)
            .then((res) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
                alert(error)
            });
    }
    function ImageInput(e) {
        setstate({ file: e.target.files[0] });
    }


    const redirect = useHistory();
    const SettingOfPage = {

        intimationletter: {
            qrcode:
                { LeftMargin: "", TopMargin: "" },
            securitykey:
                { LeftMargin: "", TopMargin: "" },
            registrationkey:
                { LeftMargin: "", TopMargin: "" },
            noteserialno:
                { LeftMargin: "", TopMargin: "" },
            issuedate:
                { LeftMargin: "", TopMargin: "" },
            backgroundpicture:
                { Bg_Image: "" }
        },

        bookingform: {
            qrcode:
                { LeftMargin: "", TopMargin: "" },
            securitykey:
                { LeftMargin: "", TopMargin: "" },
            registrationkey:
                { LeftMargin: "", TopMargin: "" },
            noteserialno:
                { LeftMargin: "", TopMargin: "" },
            issuedate:
                { LeftMargin: "", TopMargin: "" },
            backgroundpicture:
                { Bg_Image: "" }
        }

    };


    let name, value;
    function HandleInputs(e, filename, key) {
        name = e.target.name;
        value = e.target.value;
        SettingOfPage[filename][key][name] = value;
        console.log(SettingOfPage);
    }

    const SubmitPageSetting = async () => {
        console.log(SettingOfPage)
        const result = await axios.post("http://localhost:4000/pagesetting", SettingOfPage);
        // if (result.data) {
        //     redirect.push(`/users`);
        // } else {
        //     redirect.push(`/users`);
        // }
    };



    return (
        <>

            <Grid xs={12} container >

                {/* Left Side */}

                <Grid item style={{ marginTop: "20px", marginRight: "20px", marginBottom: "10px", marginLeft: "80px" }} lg={5} xs={12} sm={12} md={12} >

                    <Item>
                        <Grid item xs={12} >
                            <h2>INTIMMATION LETTER</h2>
                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }}>

                            <Grid item xs={5}  >

                            </Grid>
                            <Grid item xs={3} >
                                Left Margin
                            </Grid>
                            <Grid item xs={3} >
                                Top Margin
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                QR Code
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "qrcode")}

                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "qrcode")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Registration No.
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "registrationkey")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "registrationkey")}
                                />
                            </Grid>

                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Security Key
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "securitykey")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "securitykey")}
                                />
                            </Grid>

                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Note Serial No.
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "noteserialno")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "noteserialno")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Issued Date
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "issuedate")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "intimationletter", "issuedate")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >
                            <form onSubmit={onFormSubmit}>
                                <input type="file" name="BackgroundImage" onChange={ImageInput} />
                                <button type="submit">Upload</button>
                            </form>

                        </Grid>

                    </Item>


                </Grid>


                {/* Right Side */}
                <Grid item style={{ marginTop: "20px", marginRight: "20px", marginBottom: "10px", marginLeft: "50px" }} lg={5} xs={12} sm={12} md={12} >

                    <Item>
                        <Grid item xs={12} >
                            <h2>BOOKING FORM</h2>

                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }}>

                            <Grid item xs={5}  >

                            </Grid>
                            <Grid item xs={3} >
                                Left Margin
                            </Grid>
                            <Grid item xs={3} >
                                Top Margin
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                QR Code
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "qrcode")}

                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "qrcode")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Registration No.
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "registrationkey")}

                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "registrationkey")}
                                />
                            </Grid>

                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Security Key
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "securitykey")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "securitykey")}
                                />
                            </Grid>

                        </Grid>


                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Note Serial No.
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "noteserialno")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "noteserialno")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >

                            <Grid item xs={5}  >
                                Issued Date
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="LeftMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "issuedate")}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <input
                                    type="text"
                                    name="TopMargin"
                                    onChange={(e) => HandleInputs(e, "bookingform", "issuedate")}
                                />
                            </Grid>

                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }} >
                            <form onSubmit={onFormSubmit1}>
                                <input type="file" name="BackgroundImage" onChange={ImageInput} />
                                <button type="submit">Upload</button>
                            </form>
                        </Grid>

                    </Item>


                </Grid>

                <Grid container sx={12}>
                    <Grid xs={5} style={{ marginLeft: "60px" }}>

                    </Grid>
                    <Grid xs={2}>
                        <button onClick={SubmitPageSetting}>Update All</button>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}

export default Temp;
