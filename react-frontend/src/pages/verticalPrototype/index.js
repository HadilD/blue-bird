import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { getMedia } from './../../services/user';
import { Typography } from '@mui/material';

const VerticalPrototype = () => {

    const dispatch = useDispatch();
    const [media, setMedia] = useState([]);

    useEffect(() => {
        dispatch(setPageName("Home"))
    })

    useEffect(() => {
        async function fetchMedia() {
            const response = await getMedia()
            setMedia(response);
        }
        fetchMedia();
    }, [])

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(media && media.length !== 0) && media.map((mediaItem, index) => {
                return <div key={index} className={classes.imageCard} >
                    <img alt={mediaItem.name} className={classes.imageProps} src={mediaItem.url} />
                    <Typography className={classes.mediaName} >{mediaItem.name}</Typography>
                </div>
            })}
        </div>
    )
}

export default VerticalPrototype;
