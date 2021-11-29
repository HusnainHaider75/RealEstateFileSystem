import { React, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function ShowForm(props) {

    props.NewState(false);


    const redirect = useHistory();
    const { RegNo, type } = useParams();

    const [Details, SetDetails] = useState({
        securitykey: ``, registrationno: `DDTYJN4567J`
    })
    const [Data, SetData] = useState([]);

    let name, value;
    function HandleInputs(e) {
        name = e.target.name;
        value = e.target.value;
        SetDetails({ ...Details, [name]: value });
        console.log(Details)
    }

    const FetchData = async () => {
        const result = await axios.post("http://localhost:4000/formdata", Details);
        if (result.data) {
            redirect.push('/')
        } else {
            alert(false);
        }
    };


    return (
        <>
            <Grid xs={12} container >

                <Grid item style={{ margin: "25px" }} lg={12} xs={12} sm={12} md={12} >

                    <Item>
                        <Grid item xs={12} >
                            <h2>Please Enter Your Security Key</h2>
                        </Grid>

                        <Grid xs={12} container style={{ marginTop: "20px" }}>

                            <Grid item xs={4} >

                            </Grid>

                            <Grid item xs={2} >
                                <input
                                    type="text"
                                    name="securitykey"
                                    onChange={(e) => HandleInputs(e)}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <button onClick={FetchData}>Search</button>
                            </Grid>
                            <Grid item xs={4} >

                            </Grid>

                        </Grid>

                        <Grid item xs={12} >
                            <img src={"http://localhost:4000/IntimationBackgroundPicture.jpg"} alt="" style={{ width: "550px" }} />
                        </Grid>

                    </Item>


                </Grid>
            </Grid>
        </>
    )
}

export default ShowForm
