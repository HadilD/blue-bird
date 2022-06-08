import React, { useState } from 'react'
import useStyles from './styles';
import { Grid } from '@mui/material';
import ProfileDetails from '../../components/profile/profileDetail';

import ProfileLinks from '../../components/profile/profileLinks';
import ProfileHeader from '../../components/profile/profileHeader';
import { saveUserDetails } from '../../utils';

function Profile() {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={2}>
                <Grid container item xs={12}>
                    <ProfileHeader></ProfileHeader>
                </Grid>
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