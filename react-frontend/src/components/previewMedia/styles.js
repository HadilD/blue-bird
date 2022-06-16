import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';


const useStyles = makeStyles(theme => ({
    imageStyle: {
        display: "flex",
        justifyContent: "center"
    },
    imageSlider: {
        width: "50%"
    },
    imageDetails: {
        width: "50%"
    },
    dialogContent: {
        display: "flex",
        minHeight: "400px"
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