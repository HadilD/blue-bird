import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { getMedia } from './../../services/user';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'

const VerticalPrototype = () => {

    const displayUploadModal = useSelector((state) => state.uploadModal.displayUploadModal)

    const dispatch = useDispatch();
    const [media, setMedia] = useState([]);

    useEffect(() => {
        dispatch(setPageName("Home"))
    })

    async function fetchMedia() {
        const response = await getMedia()
        setMedia(response);
    }

    useEffect(() => {
        fetchMedia();
    }, [])

    const closeModal = () => {
      dispatch(setUploadModal(false))
      fetchMedia();

    }
    console.log({displayUploadModal})
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                displayUploadModal
                ?
                    <UploadModal closeModal={closeModal} />
                : 
                    null
            }
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
