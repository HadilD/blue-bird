//https://pixabay.com/vectors/avatar-icon-placeholder-facebook-1293744/
import { Button, Grid, Skeleton, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import avatar from './avatar.png';
import Divider from '@mui/material/Divider';

function ProfileDetails(props) {
    const classes = useStyles();

    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('John Doe')
    const [email, setEmail] = useState('johndoe@hs-fulda.de')
    const [phone, setPhone] = useState('+49 461928 172893')

    return (

        <Grid container className={classes.container}>
            <Grid item xs={6}>
                <img src={avatar} className={classes.imgcls} />
            </Grid>
            <Grid item xs={6} className={classes.infogrid}>
                <Stack>
                    <div style={{ fontFamily: 'fantasy', fontSize: 21 }}>
                        {
                            editing ?
                                <TextField label="Name" variant="standard" type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> : name
                        }
                    </div>
                    <div style={{ fontFamily: 'cursive' }}>
                        {
                            editing ?
                                <TextField label="Email" variant="standard" value={email} onChange={(e) => { setEmail(e.target.value) }} /> : email
                        }
                    </div>
                    {/* <div style={{ fontFamily: 'cursive' }}>
                        {
                            editing ?
                                <TextField label="Phone" variant="standard" value={phone} onChange={(e) => { setPhone(e.target.value) }} /> : phone
                        }
                    </div> */}
                    <Grid container className={classes.blinks}>
                        <Grid item xs={12} md={6}>
                            <Button style={{ fontFamily: 'cursive', marginRight: 'auto', fontSize: 10 }}
                                variant='contained'
                                size='small'
                                onClick={() => {
                                    setEditing(prevEditing => !prevEditing)
                                }}> {editing ? "Apply Changes" : "Edit Details"}
                            </Button>
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                            <Button style={{ fontFamily: 'cursive' }}
                                variant='contained'
                                size='small'
                                onClick={() => {
                                    setEditing(false)
                                }}>Apply Changes</Button></Grid> */}
                    </Grid>
                </Stack>
            </Grid>
        </Grid >

    )
}

export default ProfileDetails