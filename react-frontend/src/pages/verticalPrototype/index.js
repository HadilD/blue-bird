import React, { useEffect, useState } from 'react';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { Pagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'
import SearchBar from '../../components/searchBar';
import MediaPreviewModal from '../../components/previewMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchMedia } from '../../services/media'
import PlacehoderImage from "./../../assests/placeholder.png";
import { getUsers } from '../../services/user';
import Paginate from '../../components/paginate';

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
            {/* <div className={classes.root}>

                {(mediaItems && mediaItems.length !== 0) && mediaItems.map((mediaItem, index) => {
                    return <div key={index} className={classes.imageCard} >
                        {(mediaItem.attachments && mediaItem.attachments.length !== 0) ? <img alt={mediaItem.name} className={classes.imageProps} src={mediaItem.attachments[0].url} /> : <img alt={mediaItem.name} className={classes.imageProps} src={PlacehoderImage} />}
                        <div className={classes.iconLabel}>
                            <Typography className={classes.mediaName} >{mediaItem.name}</Typography>
                            <VisibilityIcon onClick={() => { handleMediaPreview(mediaItem) }} className={classes.viewIcon} />
                        </div>
                    </div>
                })}
            </div> */}
            {
                displayUploadModal &&
                <UploadModal closeModal={closeModal} />
            }
            {/* {
                mediaPreviewModal &&
                <MediaPreviewModal
                    open={mediaPreviewModal}
                    handleClose={setMediaPreviewModal}
                    mediaPreviewModalData={mediaPreviewModalData}
                />
            } */}
            <Paginate itemsPerPage={10} items={mediaItems} className={classes.fpage} />
        </div >


    )
}

export default VerticalPrototype;
