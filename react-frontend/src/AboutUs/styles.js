import { makeStyles } from '@mui/styles';
import { generalStyles } from '../generalStyles';

const useStyles = makeStyles(theme => ({
    root: {
        height: "calc(100vh - 112px)",
        [theme.breakpoints.down('sm')]: {
            height: "calc(100vh - 273px)",
        },
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        gridAutoRows: "minmax(100px, auto)",
    },
    descriptionProject: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "1 / 4",
        gridRow: "2 / 4",
    },
    one: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
        width: '30%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    two: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "3",
        gridRow: "1",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
    },
    three: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "3",
        gridRow: "4",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
    },
    four: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "1",
        gridRow: "4",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
    },
    five: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "2",
        gridRow: "4",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
    },
    six: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: "1",
        gridRow: "1",
        backgroundColor: "#bfd7ea",
        borderRadius: generalStyles.borderRadius,
        cursor: "pointer",
    },
    descriptionValue: {
        fontSize: 25,
        fontFamily: generalStyles.openSans,
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
    container: {
        display: 'flex', 
        flexDirection: 'column'
    },
    subContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },
    moduleHeadingContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '10%', 
        marginBottom: '10%'
    }
}))

export default useStyles