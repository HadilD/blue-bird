import { makeStyles } from '@mui/styles';
import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    uploadModalContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    box: { 
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        maxHeight: '80vh',
        borderRadius: '10px',
        backgroundColor: '#FAF9F6',
        border: '2px solid grey',
        overflowX: 'hidden',
        paddingBottom: '2%'
    },
    box1: { 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        padding: '0 2rem',
    },
    inputContainer: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3%'
    },
    buttonsContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },
    boxHeading: {
        fontSize: '1.25rem',
        fontFamily: "Open Sans",
        fontWeight: '600',
        color: 'white',
        margin: '0.5rem 0',
        padding: 0
    },
    boxHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        marginBottom: '3%',
        backgroundColor: generalStyles.primaryColor
    }
}))

export default useStyles