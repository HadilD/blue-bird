import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        },
        // backgroundColor: generalStyles.primaryColor
    },
    imageCard: {
        width: "calc(100% / 5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        height: "330px",
        margin: "10px 10px",
        position: "relative",
        borderRadius: "30px",
        [theme.breakpoints.down('sm')]: {
            width: "90%",
            height: "400px",
        },
    },
    imageProps: {
        width: "80%",
        [theme.breakpoints.down('sm')]: {
            width: "70%",
        },
    },
    mediaName: {
        position: "absolute",
        bottom: 25,
        color: "#000",
    }
}))

export default useStyles