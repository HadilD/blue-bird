import React, { useEffect } from 'react'
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
import {setRooms, setCurrentChat} from '../../redux/slice/chat'


const ChatScreen = () => {

  const dispatch = useDispatch()
  const chatRooms = useSelector(state => state.chat.rooms)
  const currentChat = useSelector(state => state.chat.currentChat)
  const loggedInUserId = useSelector(state => state.user.id)

  const getRooms = async() => {
    const rooms = await getAllRoomsForUser()
    console.log('NewRooms', rooms)
    dispatch(setRooms(rooms))
  }

  useEffect(() => {
    getRooms()
  }, [])

  const classes = useStyles();
  console.log('Chat rooms:', chatRooms)
  return (
    <div className={classes.root}>
      <MainContainer style={{height: '85vh', width: '100%', display: 'flex', flexDirection: 'row'}}>
        <ConversationList>
          {
            chatRooms && chatRooms.map(room => {
              console.log('Sagar Rooms: ', room)
              return (
                <>
                  <Conversation 
                    name={`${room.to_user.first_name} ${room.to_user.last_name}`} 
                    key={room.to_user.id} 
                    info={room.latest_message.content}
                    onClick={() => getCurrentChat({room_id: room.room_id})}
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
                const msgDirection = loggedInUserId === chatMsgObj.from_user.id ? "incoming" : 'outgoing'
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
                      sentTime: chatMsgObj.createdAt,
                    }} />
                  </>
                )
              })
            }
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
    </MainContainer>
    </div>
    )
}

export default ChatScreen
