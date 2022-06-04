import React, { useEffect } from 'react'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import Ad from '../../components/ad'

function MyAds(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageName("My Ads"))
    })

    return (
        <div className={classes.container}>
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
        </div>
    )
}

export default MyAds
