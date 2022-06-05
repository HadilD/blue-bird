import React from 'react';
import useStyles from './styles';
import { Button, Stack } from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

function ProfileLinks(props) {
    const classes = useStyles();

    return (
        <Stack>
            <Button variant="outlined" startIcon={<ChatIcon />}>
                Messages
            </Button>
            <Button variant="outlined" startIcon={<AdUnitsIcon />}>
                My Ads
            </Button>
            <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
                My Cart
            </Button>
            <Button variant="outlined" startIcon={<LogoutIcon />}>
                Logout
            </Button>
        </Stack>
    )
}

export default ProfileLinks