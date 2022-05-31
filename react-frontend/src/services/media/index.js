import Store from '../../redux/store/store'
import { setAllMediaItems } from '../../redux/slice/media'
import { Request } from '../../constants/api'
import { openAxios } from '../instance'


export const fetchMedia = async (searchTerm = null, category = null) => {
    let params = {}
    if (searchTerm !== null && searchTerm !== '') params['name'] = searchTerm
    if (category !== 'all' && category !== null) params['type'] = category
    const response = await getMedia(params)
    console.log('New API response:', response)
}

export const getMedia = async (params) => {
  try {
    const res = await openAxios.get(Request.GET_MEDIA, { params });
    Store.dispatch(setAllMediaItems(res.data))
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
      }
    })
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}