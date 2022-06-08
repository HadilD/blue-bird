import Store from '../../redux/store/store'
import { setAllUsers } from '../../redux/slice/user'
import { Request } from '../../constants/api'
// import { PathPram, Request } from '../../constants/api'
import { openAxios } from '../instance'
import { Constants } from '../../constants/api'

export const getUsers = async () => {
  try {
    // let body = values
    const res = await openAxios.get(Request.GET_USERS, {
      headers: {
        authorization: "Bearer " + localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
      }
    })
    // Store.dispatch(setAllUsers(res.data))
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const setUsers = async (fname, lname) => {
  try {
    let body = { fname, lname }
    const res = await openAxios.post(Request.SET_USERS, {
      data: body,
      headers: {
        authorization: localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
      }
    })
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}