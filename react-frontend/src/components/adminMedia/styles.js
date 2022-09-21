import { generalStyles } from '../../generalStyles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: '5%',
        marginBottom: '3%',
    },
    adContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '1rem',
        marginBottom: '1rem',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        }
    },
    buttonCont: {
        display: 'flex',
        margin: '10px 0px'
    },
    imageContainer: {
        width: '20%',
        height: '220px',
        borderRadius: '5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginRight: '5%',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        }
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    mediaInfoContainer: {
        width: '70%',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        }
    },
    mediaHeading: {
        fontFamily: generalStyles.openSans,
        color: '#5A5A5A',
        fontWeight: '600',
        fontSize: '2rem',
        margin: 0,
        padding: 0,
    },
    mediaDescription: {
        fontFamily: generalStyles.openSans,
        color: '#838381',
        fontSize: '1rem',
        margin: 0,
        padding: 0,
        marginTop: '0.5rem'
    },
    mediaType: {
        fontFamily: generalStyles.openSans,
        color: '#5A5A5A',
        fontSize: '1.25rem',
        margin: 0,
        padding: 0,
        marginTop: '0.5rem',
        fontWeight: 500,
    },
    mediaPrice: {
        fontFamily: generalStyles.openSans,
        color: '#5A5A5A',
        fontSize: '1.25rem',
        margin: 0,
        padding: 0,
        fontWeight: 500,
    },
    approveButton: {
        cursor: 'pointer',
        backgroundColor: '#3498db',
        border: '2px solid #3498db',
        borderRadius: '4px',
        marginLeft: '5%',
        color: '#fff',
        display: 'block',
        fontSize: '16px',
        width: '20%',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        }
    },
    disapproveButton: {
        cursor: 'pointer',
        backgroundColor: '#e74c3c',
        border: '2px solid #e74c3c',
        borderRadius: '4px',
        color: '#fff',
        display: 'block',
        fontSize: '16px',
        width: '20%',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            marginLeft: '0%',
        }
    },
    labelsContainer:{
        margin: "20px 0px"
    }
}))

export default useStyles