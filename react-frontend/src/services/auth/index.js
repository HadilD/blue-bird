import Store from '../../redux/store/store'
import { setLoginStatus, setUserRole } from '../../redux/slice/user'
import { Request, Constants } from '../../constants/api'
import { openAxios } from '../instance'
import { saveUserDetails } from '../../utils'
import { handleAPIError } from '../../utils/dialogErrorHandler'
import jwt_decode from "jwt-decode";

export const loginUser = async (values) => {
  try {
    const res = await openAxios.post(Request.LOGIN_USER, values)
    saveUserDetails(res.data)
    let decoded = jwt_decode(res.data.access);
    if (decoded.is_superuser){
      Store.dispatch(setUserRole('admin'))
    } else {
      Store.dispatch(setUserRole('user'))
    }
    Store.dispatch(setLoginStatus(true))
    return res.data
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
  try{
    const refreshToken = localStorage.getItem(Constants.STORAGE_ITEM_REFRESH_TOKEN)
    const res = await openAxios.post(Request.REFRESH_TOKEN, { refresh: refreshToken })
    saveUserDetails(res.data)
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}