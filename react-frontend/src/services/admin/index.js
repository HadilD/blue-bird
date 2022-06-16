import Store from '../../redux/store/store'
import { Request } from '../../constants/api'
import { protectedAxios } from '../instance'
import { setAdminMediaItems } from '../../redux/slice/admin'


export const getAdminMedia = async (params) => {
  try {
    const res = await protectedAxios.get(Request.GET_ADMIN_MEDIA, { params });
    Store.dispatch(setAdminMediaItems(res.data))
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const adminUpdateMediaStatus = async (values) => {
    try {
      let body = values
      const res = await protectedAxios.post(Request.UPDATE_MEDIA_STATUS_ADMIN, body)
      return res.data
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }