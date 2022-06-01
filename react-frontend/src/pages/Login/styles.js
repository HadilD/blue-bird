import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

export default useStyles