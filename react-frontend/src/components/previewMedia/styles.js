import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';


const useStyles = makeStyles(theme => ({
    imageStyle: {
        display: "flex",
        justifyContent: "center"
    },
    imageSlider: {
        width: "45%"
    },
    imageDetails: {
        width: "45%"
    },
    dialogContent: {
        display: "flex",
        justifyContent: "space-evenly",
        minHeight: "400px",
        [theme.breakpoints.down('md')]: {
            justifyContent: "space-between",
        }
    },
    mediaName: {
        fontWeight: "bold",
        fontSize: "20px"
    },
    ownerName: {
        fontSize: "17px",
        color: "#6d6d6d"
    },
    uploadedOn: {
        fontSize: "17px",
        color: "#6d6d6d"
    },
    mediaDescription: {
        fontSize: "17px",
    },
    tags: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: 'wrap'
    },
    chip: {
        margin: "0px 5px 5px 0px"
    },
    imageDetailsCont: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        top: "55px",
    },
    imageProps: {
        width: "50%",
    }
}))

export default useStyles