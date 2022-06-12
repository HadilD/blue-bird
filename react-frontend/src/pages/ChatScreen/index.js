import React from 'react'
import useStyles from './styles'

const ChatScreen = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.contactsContainer}>
                <div className={classes.chatTile}>
                    <div className={classes.userImage} />
                    <div className={classes.chatDetails}>
                        <p className={classes.userName}>Username</p>
                        <div className={classes.userMessagePreview}>user message user messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser message</div>
                    </div>
                </div>
                <div className={classes.chatTile}>
                    <div className={classes.userImage} />
                    <div className={classes.chatDetails}>
                        <p className={classes.userName}>Username</p>
                        <div className={classes.userMessagePreview}>user message user messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser message</div>
                    </div>
                </div>
                <div className={classes.chatTile}>
                    <div className={classes.userImage} />
                    <div className={classes.chatDetails}>
                        <p className={classes.userName}>Username</p>
                        <div className={classes.userMessagePreview}>user message user messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser messageuser message</div>
                    </div>
                </div>
            </div>
            <div className={classes.chatConatiner}>
                <div className={classes.messagesCont}>
                    <p className={classes.messagebubbleFL}>This is a message bubble</p>
                </div>
                <div className={classes.messageInputCont}>
                    <input placeholder="Type a message" className={classes.messageInput} />
                </div>
            </div>
        </div>
    )
}

export default ChatScreen
