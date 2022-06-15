import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        // flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            width: '90%',
            alignItems: 'center'
        },

        height: '190%',
        // justifyContent: 'center',
        alignItems: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            marginTop: '35%',
        },
        marginBottom: '3%',
        // borderLeft: '1px Solid',
        [theme.breakpoints.up('sm')]: {
            borderLeft: '1px Solid',
        },

        marginLeft: '27%',

    },

    msgContainer: {
        borderBottom: '1px Solid grey',
        marginBottom: '5px'

    },

    blinks: {
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            fontSize: 9
        }
    }

}))

export default useStyles