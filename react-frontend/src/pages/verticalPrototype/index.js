import React, { useEffect, useState } from 'react';
import { setPageName } from '../../redux/slice/pagename';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import UploadModal from '../../components/uploadModal'
import { setUploadModal } from '../../redux/slice/uploadModal'
import SearchBar from '../../components/searchBar';
import { fetchMedia } from '../../services/media'
import { getUsers } from '../../services/user';
import Paginate from '../../components/paginate';
import Copyright from '../../components/copyright';


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
            <Copyright />
            <SearchBar fetchMedia={fetchMedia} />
            {
                displayUploadModal &&
                <UploadModal closeModal={closeModal} />
            }

            <Paginate itemsPerPage={10} items={mediaItems} className={classes.fpage} />
        </div >


    )
}

export default VerticalPrototype;
