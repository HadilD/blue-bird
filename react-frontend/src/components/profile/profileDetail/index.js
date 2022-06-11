import { Button, Grid, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { generalStyles } from '../../../generalStyles';
import avatar from './avatar.png';
import { getUsers } from '../../../services/user';
import { setUsers } from '../../../services/user';

function ProfileDetails(props) {
    const classes = useStyles();
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    useEffect(() => {
        async function fetchUserDetails() {
            let res = await getUsers()
            setName(res.first_name + " " + res.last_name)
            setEmail(res.email)
        }
        fetchUserDetails()
    }, [])


    return (

        <Grid container className={classes.container}>
            <Grid item xs={6}>
                <img src={avatar} className={classes.imgcls} alt="User profile"/>
            </Grid>
            <Grid item xs={6} className={classes.infogrid}>
                <Stack>
                    <div style={{ fontFamily: generalStyles.openSans, fontSize: 21 }}>
                        {
                            editing ?
                                <TextField label="Name" variant="standard" type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> : name
                        }
                    </div>
                    <div style={{ fontFamily: generalStyles.openSans, marginTop: '5%' }}>
                        {
                            editing ?
                                <TextField label="Email" variant="standard" value={email} disabled /> : email
                        }
                    </div>
                    <Grid container className={classes.blinks}>

                        {editing ?
                            <Grid item xs={12} md={6}>
                                <Button style={{ fontFamily: generalStyles.openSans }}
                                    variant='contained'
                                    size='small'
                                    onClick={() => {
                                        setEditing(false)
                                        const [first_name, last_name] = name.split(' ')
                                        setUsers(first_name, last_name)
                                    }}>Apply Changes</Button>
                            </Grid> :
                            <Grid item xs={12} md={6}>
                                <Button style={{ fontFamily: generalStyles.openSans, marginRight: 'auto', fontSize: 10 }}
                                    variant='contained'
                                    size='small'
                                    onClick={() => {
                                        setEditing(true)
                                    }}> Edit Details
                                </Button>
                            </Grid>}
                    </Grid>
                </Stack>
            </Grid>
        </Grid >

    )
}

export default ProfileDetails