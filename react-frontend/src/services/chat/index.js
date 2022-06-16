import Store from '../../redux/store/store'
import {setCurrentChat} from '../../redux/slice/chat'
import { Request } from '../../constants/api'
import { protectedAxios } from '../instance'


export const getAllRoomsForUser = async () => {
    try {
      const res = await protectedAxios.get(Request.GET_ALL_ROOMS_FOR_USER)
      console.log('Rooms:', res.data)
      return res.data
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }

  export const getCurrentChat = async (values) => {
    const room_id = values.room_id
    try {
      const res = await protectedAxios.get(Request.GET_CURRENT_CHATS+room_id+'/messages')
      console.log('Chats:', res.data)
      Store.dispatch(setCurrentChat(res.data.reverse()))
      return res.data
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }