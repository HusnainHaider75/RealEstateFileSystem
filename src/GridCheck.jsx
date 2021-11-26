import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './temp.css'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function temp() {
    return (
        <>
                <Grid container spacing={1} >

                    <Grid item xs={6} >
                     <Item>
                            <h3 className="IntimationLetterLable">Intimation Letter</h3>
                            <Grid xs={6} spacing={2}>
                            
                                <Grid item xs={10}>
                                
                                <label className="LeftMargin">Left Margin</label>
                                <label className="TopMargin">Top Margin</label>
                                
                                </Grid>
                                <Grid xs={12}>
                                <label className="QrCodeHeading">QR Code</label>
                                <input className="QrCodeInput1" type="text" />
                                <input className="QrCodeInput2" type="text" />
                                </Grid>
                                <label className="RegNoHeading">Registration No.</label>
                                <input className="RegNoInput1" type="text" />
                                <input className="RegNoInput2" type="text" />
                            
                                <label className="SecurityKeyHeading">Security Key</label>
                                <input className="SecurityKeyInput1" type="text" />
                                <input className="SecurityKeyInput2" type="text" />
                            
                                <label className="NoteSerialNoHeading">Note Serial No</label>
                                <input className="NoteSerialNoInput1" type="text" />
                                <input className="NoteSerialNoInput2" type="text" />
                            
                                <label className="IssueDateHeading">Issued Date</label>
                                <input className="IssueDateInput1" type="text" />
                                <input className="IssueDateInput2" type="text" />
                            
                            </Grid>

                            <br />
                            </Item>
                    </Grid>


                    <Grid item xs={6}>
                        <Item>
                            <h3 className="IntimationLetterLable">Booking Form</h3>
                            
                                <label className="LeftMargin">Left Margin</label>
                                <label className="TopMargin">Top Margin</label>
                            
                                <label className="QrCodeHeading">QR Code</label>
                                <input className="QrCodeInput1" type="text" />
                                <input className="QrCodeInput2" type="text" />
                            
                                <label className="RegNoHeading">Registration No.</label>
                                <input className="RegNoInput1" type="text" />
                                <input className="RegNoInput2" type="text" />
                            
                                <label className="SecurityKeyHeading">Security Key</label>
                                <input className="SecurityKeyInput1" type="text" />
                                <input className="SecurityKeyInput2" type="text" />
                           
                                <label className="NoteSerialNoHeading">Note Serial No</label>
                                <input className="NoteSerialNoInput1" type="text" />
                                <input className="NoteSerialNoInput2" type="text" />
                           
                                <label className="IssueDateHeading">Issued Date</label>
                                <input className="IssueDateInput1" type="text" />
                                <input className="IssueDateInput2" type="text" />
                           

                            <br />
                            
                        </Item>
                        
                    </Grid>
                    
                </Grid>
      

        </>
    )
}

export default temp;
