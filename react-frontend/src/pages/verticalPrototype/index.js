import React, { useEffect, useState } from 'react';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'
import SearchBar from '../../components/searchBar';
import MediaPreviewModal from '../../components/previewMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchMedia } from '../../services/media'
import { logoutUser } from '../../services/auth'
import ProfileDetails from '../../components/profile/profileDetail';
import user from '../../redux/slice/user';
import { useNavigate } from 'react-router-dom';
import PlacehoderImage from "./../../assests/placeholder.png";
import { getUsers } from '../../services/user';

const VerticalPrototype = () => {
    const navigate = useNavigate();
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
        getUsers()
    }, [])

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
            <Button onClick={() => {
                navigate('/profile')
            }}>Profile</Button>
            <div className={classes.root}>

                {(mediaItems && mediaItems.length !== 0) && mediaItems.map((mediaItem, index) => {
                    return <div key={index} className={classes.imageCard} >
                        {console.log(mediaItem)}
                        {(mediaItem.attachments && mediaItem.attachments.length !== 0) ? <img alt={mediaItem.name} className={classes.imageProps} src={mediaItem.attachments[0].url} /> : <img alt={mediaItem.name} className={classes.imageProps} src={PlacehoderImage} />}
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
        </div >


    )
}

export default VerticalPrototype;
