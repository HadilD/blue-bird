//https://pixabay.com/vectors/avatar-icon-placeholder-facebook-1293744/
import { Button, Grid, Skeleton, Stack } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import avatar from './avatar.png';

function ProfileDetails(props) {
    const classes = useStyles();

    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('John Doe')
    const [email, setEmail] = useState('johndoe@hs-fulda.de')
    const [phone, setPhone] = useState('+49 461928 172893')

    return (

        <Grid container className={classes.container}>
            <Grid item xs={6}>
                <img src={avatar} style={{ width: '80%' }} />
            </Grid>
            <Grid item xs={6}>
                <Stack>
                    <div>
                        {
                            editing ?
                                <input value={name} onChange={(e) => { setName(e.target.value) }}></input> : "John Doe"
                        }
                    </div>
                    <div>
                        {
                            editing ?
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }}></input> : "johndoe@hs-fulda.de"
                        }
                    </div>
                    <div>
                        {
                            editing ?
                                <input value={phone} onChange={(e) => { setPhone(e.target.value) }}></input> : "+49 461928 172893"
                        }
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    setEditing(true)
                                }}
                            >
                                Edit Details
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='outlined'
                                onClick={() => {
                                    setEditing(false)
                                }}>Apply Changes</Button></Grid>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>

    )
}

export default ProfileDetails