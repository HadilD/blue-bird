import React from 'react';
import useStyles from './styles';

import { Grid, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function ProfileHeader(props) {
    const classes = useStyles();

    return (
        <>
            <Grid
                item
                xs={6}
            >
                Profile
            </Grid>

            <Grid
                item
                xs={6}
                style={{ textAlign: 'end' }}
            >
                <IconButton aria-label="profile" >
                    <AccountCircleOutlinedIcon />
                </IconButton>

            </Grid>
        </>
    )
}

export default ProfileHeader