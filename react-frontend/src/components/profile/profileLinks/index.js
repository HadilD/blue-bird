import React from 'react';
import useStyles from './styles';
import { Button, Stack } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../services/auth';


function ProfileLinks(props) {

    const navigate = useNavigate()
    const classes = useStyles();

    return (

        <Stack className={classes.container}>
            <div className={classes.msgContainer}>
                <Button onClick={() => { navigate('/chat') }} className={classes.blinks} variant="text" startIcon={<ChatIcon />} >
                    Messages
                    <ArrowForwardIosIcon sx={{ marginLeft: 'auto' }} />
                </Button>
            </div>
            <div className={classes.msgContainer}>
                <Button className={classes.blinks} variant="text" size='large' startIcon={<AdUnitsIcon />} >
                    My Ads
                    <ArrowForwardIosIcon sx={{ marginLeft: '25px' }} />
                </Button>
            </div>
            <div className={classes.msgContainer}>
                <Button className={classes.blinks} onClick={() => {
                    logoutUser()
                    navigate('/')
                }} variant="text" startIcon={<LogoutIcon />} >
                    Logout
                    <ArrowForwardIosIcon sx={{ marginLeft: '13px' }} />
                </Button>
            </div>
        </Stack >
    )
}

export default ProfileLinks