import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    contactsContainer: {
        width: "29%",
        height: "90vh",
        borderRadius: "30px",
        backgroundColor: "#1d3461"
    },
    chatConatiner: {
        width: "70%",
        height: "90vh",
        borderRadius: "30px",
        backgroundColor: "#1d3461",
        position: "relative",
    },
    chatTile: {
        display: "flex",
        alignItems: "center",
        width: "95%",
        backgroundColor: "#fff",
        borderRadius: "30px",
        margin: "10px auto",
        cursor: "pointer",
    },
    userImage: {
        backgroundColor: "#1d3461",
        width: "9%",
        height: "57px",
        borderRadius: "30px",
        margin: "10px",
    },
    chatDetails: {
        width: "80%"
    },
    userName: {
        fontWeight: "bold",
        marginBottom: "0px"
    },
    userMessagePreview: {
        whiteSpace: "nowrap",
        width: "95%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: "10px",
    },
    messageInputCont: {
        display: "flex",
        justifyContent: "center",
    },
    messageInput: {
        position: "absolute",
        bottom: 0,
        width: "98%",
        height: "80px",
        borderRadius: "30px",
        margin: "10px auto",
        fontSize: "24px",
        outline: "none",
        padding: "10px"
    },
    messagesCont: {
        backgroundColor: "#fff",
        width: "98%",
        height: "90%",
        borderRadius: "30px",
        margin: "10px auto"
    },
    messagebubbleFR: {
        display: "flex",
        float: "right",
        backgroundColor: "#1d3461",
        width: "fit-content",
        color: "#fff",
        borderRadius: "30px",
        padding: "10px"
    },
    messagebubbleFL: {
        display: "flex",
        float: "left",
        backgroundColor: "#1d3461",
        width: "fit-content",
        color: "#fff",
        borderRadius: "30px",
        padding: "10px",
        marginLeft: "10px",
    }
});

export default useStyles