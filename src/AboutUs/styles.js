import { makeStyles } from '@mui/styles';
import { generalStyles } from '../generalStyles';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 112px)",
        [theme.breakpoints.down('sm')]: {
            height: "calc(100vh - 373px)",
        },
    },
    colabTile: {
        backgroundColor: "#bfd7ea",
        width: "30%",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
        flexDirection: "column",
        margin: "0px 0px 10px 0px",
        [theme.breakpoints.down('sm')]: {
            width: "80%",
        },
    },
    colabImg: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        backgroundColor: "#000",
    },
    colabDetails: {
        padding: "10px",
    },
    colabName: {
        fontSize: 50,
        fontFamily: generalStyles.squarePeg,
    },
    colabTitle: {
        fontSize: 25,
        fontFamily: generalStyles.openSans,
    },
}))

export default useStyles