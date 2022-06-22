import Store from '../../redux/store/store'
import { setAllMediaItems, setMyMedias } from '../../redux/slice/media'
import { Request } from '../../constants/api'
import { protectedAxios } from '../instance'


export const fetchMedia = async (searchTerm = null, category = null) => {
    let params = {}
    if (searchTerm !== null && searchTerm !== '') params['search'] = searchTerm
    // if (category !== 'all' && category !== null) params['type'] = category
    await getMedia(params)
}


//do not call getMedia directly, always go through fetchMedia
const getMedia = async (params) => {
  try {
    const res = await protectedAxios.get(Request.GET_MEDIA, { params });
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
    const res = await protectedAxios.post(Request.UPLOAD_MEDIA, body)
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const uploadAttachmentService = async (values) => {
  try {
    let body = values
    const res = await protectedAxios.post(Request.UPLOAD_ATTACHMENT, body, {
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

export const getMineMedia = async () => {
  try {
    const res = await protectedAxios.get(Request.GET_MINE_MEDIAS);
    Store.dispatch(setMyMedias(res.data))
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}

export const updateMedia = async (values) => {
  try {
    let body = {
      name: values.name,
      description: values.description,
      cost: values.cost,
      tags: values.tags
    }
    const res = await protectedAxios.put(Request.UPLOAD_MEDIA + '/' + values.id, body)
    return res.data
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}