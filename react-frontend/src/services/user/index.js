import { Constants } from '../../constants/api'
import { Request } from '../../constants/api'
import Store from '../../redux/store/store'
import { openAxios } from '../instance'
import { setAllUsers } from '../../redux/slice/user'

export const getUsers = async () => {
  try {
    // let body = values
    const res = await openAxios.get(Request.GET_USERS, {
      headers: {
        authorization: "Bearer " + localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
      }
    })
    Store.dispatch(setAllUsers(res.data))
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const setUsers = async (first_name, last_name) => {
  try {
    let body = { first_name, last_name }
    const res = await openAxios.put(Request.SET_USERS, body, {
      headers: {
        authorization: "Bearer " + localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
      }
    })
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}