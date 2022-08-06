import React from 'react'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import ProfileDetails from '../../components/profile/profileDetail';
import { setPageName } from '../../redux/slice/pagename';
import ProfileLinks from '../../components/profile/profileLinks';
import { useEffect } from 'react';
import Copyright from '../../components/copyright';

function Profile() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageName("My Profile"))
    })

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <Copyright />
            </div>
            <Grid container spacing={2}>
                {/* <Grid container item xs={12}>
                    <ProfileHeader></ProfileHeader>
                </Grid> */}
                <Grid item xs={8} md={8}>
                    <ProfileDetails />
                </Grid>
                <Grid item xs={4} md={4}>
                    <ProfileLinks></ProfileLinks>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile