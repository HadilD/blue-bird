import React from 'react';
import useStyles from './styles';

import { Grid, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Divider from '@mui/material/Divider';

function ProfileHeader(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>

            <Grid style={{ fontStyle: 'initial', fontSize: 23 }}
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
                <IconButton className={classes.accountbtn} aria-label="profile" >
                    <AccountCircleOutlinedIcon fontSize="large" />
                </IconButton>

            </Grid>
            <Divider />
        </div>

    )
}

export default ProfileHeader