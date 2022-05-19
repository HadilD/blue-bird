import Store from '../../redux/store/store'
import { setAllUsers } from '../../redux/slice/user'
import { PathPram, Request } from '../../constants/api'
import { openAxios } from '../instance'

export const getUsers = async (values) => {
  try {
    // let body = values
    const res = await openAxios.get(Request.GET_USERS)
    Store.dispatch(setAllUsers(res.data))
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const getMedia = async () => {
  try {
    const res = await openAxios.get(Request.GET_MEDIA);
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const uploadImageMediaService = async (values) => {
  try {
    let body = values
    const res = await openAxios.post(Request.UPLOAD_MEDIA, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }})
    return res.data
  } catch(err){
    console.log(JSON.stringify(err))
    throw err
  }
}