import Store from '../../redux/store/store'
import { setLoginStatus } from '../../redux/slice/user'
import { Request, Constants } from '../../constants/api'
import { openAxios } from '../instance'
import { saveUserDetails } from '../../utils'
import { handleAPIError } from '../../utils/dialogErrorHandler'

export const loginUser = async (values) => {
  try {
    const res = await openAxios.post(Request.LOGIN_USER, values)
    saveUserDetails(res.data)
    Store.dispatch(setLoginStatus(true))
    console.log(res)
  } catch (err) {
    handleAPIError(err, 'Username or password is incorrect !')
    console.log(JSON.stringify(err))
    throw err
  }
}

export const logoutUser = async () => {
  try {
    localStorage.removeItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
    localStorage.removeItem(Constants.STORAGE_ITEM_REFRESH_TOKEN)
    Store.dispatch(setLoginStatus(false))
    return
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const registerUser = async (values) => {
  try {
    let body = values
    const res = await openAxios.post(Request.REGISTER_USER, body);
    return res.data
  } catch (err) {
    handleAPIError(err, 'Something went wrong while registering user. Try again later..')
    console.log(JSON.stringify(err))
    throw err
  }
}

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(Constants.STORAGE_ITEM_REFRESH_TOKEN)
    const res = await openAxios.post(Request.REFRESH_TOKEN, { refresh: refreshToken })
    saveUserDetails(res.data)
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}