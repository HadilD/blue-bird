import { makeStyles } from '@mui/styles';
// import { generalStyles } from '../../generalStyles';

const useStyles = makeStyles(theme => ({
    searchContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '1%', 
        marginBottom: '3%',
    },
    inputContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '2px solid #f0f0f0', 
        borderRadius: '5px', 
        width: '30%'
    },
    searchInput: { 
        border: 0,
        height: '40px',
        padding: '7px', 
        fontSize: 17, 
        outline: 'none', 
        width: '100%'
    },
    searchCategories: {
        width: '120px', 
        height: '40px', 
        fontSize: 16
    },
    searchButtonContainer: {
        marginLeft: '2%', 
        marginRight: '2%'
    }
}))

export default useStyles