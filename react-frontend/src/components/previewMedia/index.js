import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MobileStepper, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import useStyles from './styles';
import moment from "moment";
import PlacehoderImage from "./../../assests/placeholder.png";
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, getAllRoomsForUser } from '../../services/chat';
import { setCurrentRoomId } from '../../redux/slice/chat';
import { useNavigate } from 'react-router-dom';
import { downloadMedia } from '../../services/download';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MediaPreviewModal = (props) => {

    const { open, handleClose, mediaPreviewModalData } = props;
    const loggedInUserId = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [disableContactSellerButton, setDisableContactSellerButton] = useState(true);
    const maxSteps = mediaPreviewModalData.attachments.length;
    const theme = useTheme();

    useEffect(() => {
        if (loggedInUserId.users.id === mediaPreviewModalData.owner.id) {
            setDisableContactSellerButton(false)
        }
    })

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const contactSeller = async () => {
        const rooms = await getAllRoomsForUser()
        let isRoomAvailable = false;
        let room = null;

        for (let i = 0; i < rooms.length; i++) {
            if (mediaPreviewModalData.owner.id === rooms[i].to_user.id || mediaPreviewModalData.owner.id === rooms[i].from_user.id) {
                isRoomAvailable = true;
                room = rooms[i];
                break;
            }
        }

        if (isRoomAvailable) {
            dispatch(setCurrentRoomId(room.room_id))
        } else {
            await createRoom({
                "to_user": mediaPreviewModalData.owner.id
            });
        }

        navigate('/chat')
    }

    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(!open)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
        >
            <DialogContent className={classes.dialogContent}>
                {(mediaPreviewModalData && mediaPreviewModalData.attachments && mediaPreviewModalData.attachments.length > 0) ? <div oncontextmenu="return false;" className={classes.imageSlider}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography>{mediaPreviewModalData.attachments[activeStep].label}</Typography>
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {mediaPreviewModalData.attachments.map((step, index) => (

                            <div key={index}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 255,
                                            display: 'block',
                                            maxWidth: 400,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.url}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </div> : <img alt={mediaPreviewModalData.name} className={classes.imageProps} src={PlacehoderImage} />}

                <div className={classes.imageDetails} >
                    <div className={classes.imageDetailsCont}>
                        <Typography className={classes.mediaName}>{mediaPreviewModalData.name}</Typography>
                        <Typography className={classes.ownerName}>{`Uploaded by: ${mediaPreviewModalData.owner.first_name} ${mediaPreviewModalData.owner.last_name}`}</Typography>
                        <Typography className={classes.uploadedOn}>{`Uploaded on: ${moment(mediaPreviewModalData.created_at).format("Do MMM YYYY")}`}</Typography>
                        <br />
                        <Typography className={classes.mediaDescription}>{mediaPreviewModalData.description}</Typography>
                        <br />
                        {(mediaPreviewModalData && mediaPreviewModalData.tags.length > 0) && <div className={classes.tags}>
                            {
                                mediaPreviewModalData.tags.map((tag, index) => {
                                    return <Chip label={tag} key={index} className={classes.chip} />
                                })
                            }
                        </div>}
                        <br />
                        <Typography>{`Cost: ${mediaPreviewModalData.cost === "0.00" ? "Free" : mediaPreviewModalData.cost}`}</Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                {disableContactSellerButton && <Button style={{ backgroundColor: "#1d3461" }} onClick={() => contactSeller()} variant="contained" >Contact Seller</Button>}
                {((mediaPreviewModalData && mediaPreviewModalData.attachments && mediaPreviewModalData.attachments.length !== 0) && (mediaPreviewModalData.cost === "0.00")) && <Button style={{ backgroundColor: "#1d3461" }} onClick={() => { downloadMedia(mediaPreviewModalData) }} variant="contained">Download</Button>}
                <Button onClick={() => handleClose(!open)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default MediaPreviewModal

