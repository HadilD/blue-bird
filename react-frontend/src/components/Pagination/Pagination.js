import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import useStyles from './styles';
import MediaPreviewModal from '../../components/previewMedia';
import { Pagination } from '@mui/material';


export default function PaginatedItems({ itemsPerPage, items }) {

    const [mediaPreviewModal, setMediaPreviewModal] = useState(false);
    const [mediaPreviewModalData, setMediaPreviewModalData] = useState([]);

    const handleMediaPreview = (mediaItem) => {
        setMediaPreviewModal(!mediaPreviewModal);
        setMediaPreviewModalData(mediaItem);
    }

    const classes = useStyles();

    function Items({ currentItems }) {
        return (
            <div className={classes.root}>
                {currentItems &&
                    currentItems.map((item) => (
                        <div key={item.id} className={classes.imageCard} >
                            <img alt={item.name} className={classes.imageProps} src={item.url} />
                            <div className={classes.iconLabel}>
                                <Typography className={classes.mediaName} >{item.name}</Typography>
                                <VisibilityIcon onClick={() => { handleMediaPreview(item) }} className={classes.viewIcon} />
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        console.log("fjklasjdfklsa", items);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            {/* <Pagination count={10} onPageChange={handlePageClick} pageCount={pageCount} color="primary" /> */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            {
                mediaPreviewModal &&
                <MediaPreviewModal
                    open={mediaPreviewModal}
                    handleClose={setMediaPreviewModal}
                    mediaPreviewModalData={mediaPreviewModalData}
                />
            }
        </>
    );
}