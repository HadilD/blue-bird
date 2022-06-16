import Store from '../../redux/store/store'
import { setMyOrders } from '../../redux/slice/order'
import { Request } from '../../constants/api'
import { protectedAxios } from '../instance'

export const getSingleMedia = async(media_id) => {
    try {
        const res = await protectedAxios.get(Request.GET_MEDIA + '/' + media_id)
        return res.data
    } catch (err) {
        console.log(JSON.stringify(err))
        throw err
    }
}

export const getMyOrders = async () => {
    try {
      const res = await protectedAxios.get(Request.GET_MY_ORDERS);
      let media_ids = []
      res.data.forEach(element => { media_ids.push(element.media) });
      let myOrders = []
      for (let i=0; i<media_ids.length; i++) {
        const newRes = await getSingleMedia(media_ids[i])
        myOrders.push(newRes)
      }
      Store.dispatch(setMyOrders(myOrders))
      return res.data
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }