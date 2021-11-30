import { React, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

function ShowForm(props) {

    props.NewState(false);

    const [Error, SetError] = useState(false);

    const redirect = useHistory();
    const { RegNo, type } = useParams();

    const [Details, SetDetails] = useState({
        securitykey: ``, registrationno: `${RegNo}`, type: `${type}`
    })
    let name, value;
    function HandleInputs(e) {
        name = e.target.name;
        value = e.target.value;
        SetDetails({ ...Details, [name]: value });
        SetError(false);
    }

    const FetchData = async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:4000/formdata", Details);
        if (result.data) {
            if (type === "intimation") {
                redirect.push(`/intimationQrCode/registration/${RegNo}/type/${type}`)
            }
            else {
                if (type === "booking") {
                    redirect.push(`/bookingQrCode/registration/${RegNo}/type/${type}`)
                }
                else {

                }
            }
        }
        else {
            SetError(true);
        }
    };


    return (
        <>
            <Grid xs={12} container >
                <Grid item style={{ margin: "30px" }} lg={12} xs={12} sm={12} md={12} >
                    <Grid item xs={12} >
                    </Grid>
                    <Grid xs={12} container style={{ marginTop: "20px" }}>
                        <Grid item xs={4} >
                        </Grid>
                        <form onSubmit={(e) => FetchData(e)}>
                            <Grid item xs={12} >
                                <h2>Please Enter Your Security Key</h2>
                                <input
                                    type="text"
                                    name="securitykey"
                                    onChange={(e) => HandleInputs(e)}
                                    required
                                />
                                {Error ? <h4 style={{ color: "red", fontFamily: "Times New Roman", marginRight: "335px" }}>Record not found for this key!</h4> : ""}
                            </Grid>
                            <Grid item xs={12}>
                                <button type="submit" >Search</button>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} >
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ShowForm