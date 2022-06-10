import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid red'
    }
}))

export default useStyles