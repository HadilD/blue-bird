import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'

const MediaPreviewModal = (props) => {

    const { open, handleClose, mediaPreviewModalData } = props;
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => handleClose(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {mediaPreviewModalData.name}
                </DialogTitle>
                <DialogContent>
                    <div className={classes.imageStyle}>
                        <img
                            width="90%"
                            alt={mediaPreviewModalData.name}
                            src={mediaPreviewModalData.url}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => handleClose(!open)}>Download</Button> */}
                    <Button onClick={() => handleClose(!open)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default MediaPreviewModal

const useStyles = makeStyles(theme => ({
    imageStyle: {
        display: "flex",
        justifyContent: "center"
    },
}));