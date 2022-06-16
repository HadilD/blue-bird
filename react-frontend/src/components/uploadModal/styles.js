import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    uploadModalContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    box: { 
        display: 'flex', 
        width: '40%', 
        height: '35rem', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        border: '2px solid grey'
    },
    box1: { 
        display: 'flex', 
        flexDirection: 'column', 
        margin: '1em', 
        width: '100%', 
        marginBottom: '10%' 
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
        justifyContent: 'space-around'
    }
}))

export default useStyles