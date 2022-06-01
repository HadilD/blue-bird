import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { getMedia } from './../../services/user';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'
import SearchBar from '../../components/searchBar';
import MediaPreviewModal from '../../components/previewMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paginate from '../../components/Pagination/Pagination';

const VerticalPrototype = () => {

    const displayUploadModal = useSelector((state) => state.uploadModal.displayUploadModal)

    const dispatch = useDispatch();
    const [media, setMedia] = useState([]);
    const [mediaPreviewModal, setMediaPreviewModal] = useState(false);
    const [mediaPreviewModalData, setMediaPreviewModalData] = useState([]);

    useEffect(() => {
        dispatch(setPageName("Home"))
    })

    const fetchMedia = async (searchTerm = null, category = null) => {
        let params = {}
        if (searchTerm !== null && searchTerm !== '') params['name'] = searchTerm
        if (category !== 'all' && category !== null) params['type'] = category
        console.log('Params:', params)
        const response = await getMedia(params)
        setMedia(response);
    }

    useEffect(() => {
        fetchMedia();
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

                {(media && media.length !== 0) && media.map((mediaItem, index) => {
                    return <div key={index} className={classes.imageCard} >
                        <img alt={mediaItem.name} className={classes.imageProps} src={mediaItem.url} />
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
            {/*
                mediaPreviewModal &&
                <MediaPreviewModal
                    open={mediaPreviewModal}
                    handleClose={setMediaPreviewModal}
                    mediaPreviewModalData={mediaPreviewModalData}
                />
        */}
            <Paginate itemsPerPage={10} items={media} />
        </div>


    )
}

export default VerticalPrototype;
