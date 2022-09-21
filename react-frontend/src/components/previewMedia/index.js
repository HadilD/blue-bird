import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MobileStepper, Paper, Typography, DialogContentText, Alert  } from '@mui/material'
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
import { createOrder } from '../../services/order'
import { setCurrentRoomId } from '../../redux/slice/chat';
import { useNavigate } from 'react-router-dom';
import { downloadMedia } from '../../services/download';
import Rating from '@mui/material/Rating';
import StarsIcon from '@mui/icons-material/Stars';
import Slide from '@mui/material/Slide';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const MediaPreviewModal = (props) => {

    const { open, handleClose, mediaPreviewModalData } = props;
    const loggedInUserId = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [disableContactSellerButton, setDisableContactSellerButton] = useState(true);
    const [avgRating, setAvgRating] = useState(0)
    const [numRating, setNumRating] = useState(0)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const maxSteps = mediaPreviewModalData.attachments.length;
    const theme = useTheme();

    useEffect(() => {
        if (loggedInUserId.users.id === mediaPreviewModalData.owner.id) {
            setDisableContactSellerButton(false)
        }
    })

    useEffect(() => {
        let ratings = mediaPreviewModalData.ratings
        let sumRatings = 0
        if (ratings.length) {
            ratings.forEach((rating) => {
                sumRatings += rating.stars
            })
        }
        let avgRating = parseInt(sumRatings/ratings.length)
        setAvgRating(avgRating)
        setNumRating(ratings.length)
    }, [])

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

    const handleDialogOpen = () => {
        setDialogOpen(true);
      };
    
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogCloseAndSubmit = async () => {
        setDialogOpen(false);
        const orderRes = await createOrder(mediaPreviewModalData.id)
        downloadMedia(mediaPreviewModalData)
        if (orderRes.hasOwnProperty('error')) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 2000)
        }
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
                                    return <Chip label={tag} key={index} className={classes.chip} variant="outlined" />
                                })
                            }
                        </div>}
                        <br />
                        <Typography>{`Cost: ${mediaPreviewModalData.cost === "0.00" ? "Free" : mediaPreviewModalData.cost}`}</Typography>
                        <Typography style={{display:'flex', flexDirection: 'row'}}>
                            <Rating name="read-only" value={avgRating} readOnly />
                            <p style={{margin: 0}}>({numRating})</p>
                        </Typography>
                        {
                            mediaPreviewModalData.editor_choice
                            ?
                                <Typography>
                                    <Chip icon={<StarsIcon />} label="Editor's Choice" variant="filled" color="warning" size="small" />
                                </Typography>
                            :
                                null
                        }
                    </div>
                </div>
            </DialogContent>
            {
                showAlert && <Alert severity="error">Media is already bought by you cannot buy again.</Alert>
            }
            <DialogActions>
                {disableContactSellerButton 
                    ? 
                        <>
                            <Button style={{ backgroundColor: "#1d3461" }} onClick={() => handleDialogOpen()} variant="contained" >Create Order</Button>
                            <Dialog
                                open={dialogOpen}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleDialogClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Create Order"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Are you sure want to create an order and buy media?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleDialogClose}>Disagree</Button>
                                <Button onClick={handleDialogCloseAndSubmit}>Agree</Button>
                                </DialogActions>
                            </Dialog>
                            <Button style={{ backgroundColor: "#1d3461" }} onClick={() => contactSeller()} variant="contained" >Contact Seller</Button>
                        </>
                    :
                        null
                    }
                {((mediaPreviewModalData && mediaPreviewModalData.attachments && mediaPreviewModalData.attachments.length !== 0) && (mediaPreviewModalData.cost === "0.00")) && <Button style={{ backgroundColor: "#1d3461" }} onClick={() => { downloadMedia(mediaPreviewModalData) }} variant="contained">Download</Button>}
                <Button onClick={() => handleClose(!open)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default MediaPreviewModal

