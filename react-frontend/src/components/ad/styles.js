import { makeStyles } from '@mui/styles';
import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    adContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    imageContainer: {
        width: '20%',
        height: '220px',
        borderRadius: '5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginRight: '5%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    mediaInfoContainer: {
        width: '70%',
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
        marginTop: '0.5rem',
        fontWeight: 500,
    }
}))

export default useStyles