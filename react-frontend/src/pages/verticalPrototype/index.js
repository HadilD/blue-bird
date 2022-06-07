import React, { useEffect, useState } from 'react';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'
import SearchBar from '../../components/searchBar';
import MediaPreviewModal from '../../components/previewMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchMedia } from '../../services/media'
import {logoutUser} from '../../services/auth'

const VerticalPrototype = () => {

    const displayUploadModal = useSelector((state) => state.uploadModal.displayUploadModal)
    const dispatch = useDispatch()
    const mediaItems = useSelector((state) => state.media.mediaItems)
    const [mediaPreviewModal, setMediaPreviewModal] = useState(false);
    const [mediaPreviewModalData, setMediaPreviewModalData] = useState([]);

    useEffect(() => {
        dispatch(setPageName("Home"))
    })

    useEffect(() => {
        fetchMedia()
    },[])

    const closeModal = () => {
        dispatch(setUploadModal(false))
        fetchMedia();
    }

    const handleMediaPreview = (mediaItem) => {
        setMediaPreviewModal(!mediaPreviewModal);
        setMediaPreviewModalData(mediaItem);
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <SearchBar fetchMedia={fetchMedia} />
            <p onClick={() => logoutUser()}>Logout</p>
            <div className={classes.root}>

                {(mediaItems && mediaItems.length !== 0) && mediaItems.map((mediaItem, index) => {
                    return <div key={index} className={classes.imageCard} >
                        <img alt={mediaItem.name} className={classes.imageProps} src={mediaItem.url} />
                        <div className={classes.iconLabel}>
                            <Typography className={classes.mediaName} >{mediaItem.name}</Typography>
                            <VisibilityIcon onClick={() => { handleMediaPreview(mediaItem) }} className={classes.viewIcon} />
                        </div>
                    </div>
                })}
            </div>
            {
                displayUploadModal &&
                <UploadModal closeModal={closeModal} />
            }
            {
                mediaPreviewModal &&
                <MediaPreviewModal
                    open={mediaPreviewModal}
                    handleClose={setMediaPreviewModal}
                    mediaPreviewModalData={mediaPreviewModalData}
                />
            }
        </div>


    )
}

export default VerticalPrototype;
