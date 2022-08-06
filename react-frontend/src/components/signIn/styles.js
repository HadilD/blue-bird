import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    signInContainer: {
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
        width: '400px'
    },
    formContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        padding: "30px 40px"
    },
    formControl: {
        marginBottom: '10px',
        paddingBottom:'40px',
        position: 'relative',
    },
    adminFormControl: {
        display: 'flex', 
        flexDirection: 'row',
        marginBottom: '10px',
        paddingBottom:'40px',
        position: 'relative',
    },
    label: {
        color: '#777',
        display: 'block',
        marginBottom: '5px',
        
    },
    adminLabel: {
        color: '#777',
        display: 'inline',
        marginLeft: '5%'
        // marginBottom: '5px',
    },
    input: {
        border: '2px solid #f0f0f0',
        borderRadius: '4px',
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '14px',
    },
    button: {
        cursor: 'pointer',
        backgroundColor: '#3498db',
        border: '2px solid #3498db',
        borderRadius: '4px',
        color: '#fff',
        display: 'block',
        fontSize: '16px',
        padding: '10px',
        marginTop: '20px',
        width: '100%',
    },
    signUpStatement: {
        textAlign: 'center',
        color: '#777',
        fontSize: '14px'
    },
    register: {
        color: '#2ecc71',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    heading: {
        textAlign: 'center',
        margin: '0 0 20px',
    },
    errorMsg: {
        color: '#e74c3c',
        fontSize: '13px',
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
}))

export default useStyles