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
import { setRooms, setCurrentChat } from '../../redux/slice/chat'

const ChatScreen = () => {

    const [roomId, setRoomId] = useState(null)

    const dispatch = useDispatch()
    const chatRooms = useSelector(state => state.chat.rooms)
    const currentChat = useSelector(state => state.chat.currentChat)
    const loggedInUserId = useSelector(state => state.user)
    const [currentWebSocket, setCurrentWebSocket] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)

    const getRooms = async () => {
        const rooms = await getAllRoomsForUser()
        dispatch(setRooms(rooms))
    }

    useEffect(() => {
        getRooms()
    }, [])

    //create websocket on room change
    useEffect(() => {
        if (roomId !== null) {
            const chatSocket = new WebSocket('wss://bluebird.no-ip.org/ws/' + roomId + '/');
            setCurrentWebSocket(chatSocket);
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
                                        name={`${room.to_user.first_name} ${room.to_user.last_name}`}
                                        key={room.to_user.id}
                                        info={room.latest_message.content}
                                        onClick={() => {
                                            setCurrentRoom(room)
                                            setRoomId(room.room_id)
                                            getCurrentChat({ room_id: room.room_id })
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
                                const msgDirection = loggedInUserId && loggedInUserId.users && loggedInUserId.users.id === chatMsgObj.from_user.id ? "incoming" : 'outgoing'
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
                            'room_id': roomId
                        }));
                    }} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default ChatScreen
