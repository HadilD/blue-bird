import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        // border: '1px solid blue',
        width: '102%',
        height: '105%',
        marginTop: '29px'
    },

    blinks: {
        marginTop: '17px',
    },

    imgcls: {
        width: '50%',
        [theme.breakpoints.up('md')]: { marginLeft: '157px' },
        display: 'flex',
        //  position: 'inherit'
        paddingLeft: '-20%'
    },

    infogrid: {
        [theme.breakpoints.down('md')]: {
            marginLeft: '-20%'
        }

    }

}))

export default useStyles