import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationList,
    Conversation,
    MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { getAllRoomsForUser, getCurrentChat } from '../../services/chat';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms, setCurrentChat, setCurrentRoomId } from '../../redux/slice/chat'

const ChatScreen = () => {

    const roomId = useSelector(state => state.chat.currentRoomId)

    // const [roomId, setRoomId] = useState(null)

    const dispatch = useDispatch()
    const chatRooms = useSelector(state => state.chat.rooms)
    const currentChat = useSelector(state => state.chat.currentChat)
    const loggedInUserId = useSelector(state => state.user)
    const [currentWebSocket, setCurrentWebSocket] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [fromUser, setFromUser] = useState("")

    const getRooms = async () => {
        const rooms = await getAllRoomsForUser()
        dispatch(setRooms(rooms))
    }

    // useEffect(() => {
    //     if (roomIdRedux !== null) {
    //         setRoomId(roomIdRedux)
    //     }
    // }, [roomIdRedux])

    useEffect(() => {
        getRooms()
    }, [])

    //create websocket on room change
    useEffect(() => {
        if (roomId !== null) {
            const chatSocket = new WebSocket('wss://bluebird.no-ip.org/ws/' + roomId + '/');
            setCurrentWebSocket(chatSocket);
            getCurrentChat({ room_id: roomId })
        }
    }, [roomId])

    useEffect(() => {
        if (currentWebSocket !== null) {
            currentWebSocket.onopen = function (e) {
                console.log("Connection Established")
            };
        }
    }, [currentWebSocket])

    if (currentWebSocket != null) {
        currentWebSocket.onmessage = function (event) {
            getCurrentChat({ room_id: roomId })
        }
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainContainer style={{ height: '85vh', width: '100%', display: 'flex', flexDirection: 'row' }}>
                <ConversationList>
                    {
                        chatRooms && chatRooms.map(room => {
                            return (
                                <>
                                    <Conversation
                                        name={`${room.from_user.first_name} ${room.from_user.last_name}`}
                                        key={room.to_user.id}
                                        info={room.latest_message.content}
                                        onClick={() => {
                                            setCurrentRoom(room)
                                            // setRoomId()
                                            dispatch(setCurrentRoomId(room.room_id))

                                            setFromUser((room.to_user.id === (loggedInUserId && loggedInUserId.users && loggedInUserId.users.id)) ? room.from_user.id : room.to_user.id)
                                        }}
                                    />
                                    <MessageSeparator />
                                </>
                            )
                        })
                    }
                </ConversationList>
                <ChatContainer>
                    <MessageList>
                        {
                            currentChat.map((chatMsgObj, index) => {
                                const msgDirection = loggedInUserId && loggedInUserId.users && loggedInUserId.users.id === chatMsgObj.from_user.id ? "outgoing" : 'incoming'
                                return (
                                    <>
                                        <Message
                                            key={index}
                                            model={{
                                                message: chatMsgObj.content,
                                                sentTime: chatMsgObj.createdAt,
                                                sender: chatMsgObj.from_user.first_name + ' ' + chatMsgObj.from_user.last_name,
                                                direction: msgDirection,
                                                position: "single",
                                            }} />
                                    </>
                                )
                            })
                        }
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={(e) => {
                        currentWebSocket.send(JSON.stringify({
                            'content': e,
                            'room_id': roomId,
                            'from_user': loggedInUserId && loggedInUserId.users && loggedInUserId.users.id,
                            'to_user': fromUser,
                        }));
                    }} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default ChatScreen
