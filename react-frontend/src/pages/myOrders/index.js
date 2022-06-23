import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import Ad from '../../components/ad'
import SearchByName from '../../components/searchByName'
import { getMyOrders } from '../../services/order'
import Copyright from '../../components/copyright';

function MyOrders() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const allMedia = useSelector(state => state.order.myOrders)
    const [resultMedia, setResultMedia] = useState([])

    useEffect(() => {
        dispatch(setPageName("My Orders"))
    })

    useEffect( async () => {
        const res = await getMyOrders()
        setResultMedia(res)
    }, [])

    
    const updateSearchResult = (searchQuery, category) => {
      let tempRes = null
      if (searchQuery === '' ) {
          tempRes = allMedia
      } else {
          tempRes = resultMedia.filter(item => {
              return item.media.name.toLowerCase().includes(searchQuery.toLowerCase())
          })
      }
      if(category === 'all') {
          setResultMedia(tempRes)
      } else if (category === 'approved'){
          let newTempRes = tempRes.filter(item => {
              return item.media.is_approved === true
          })
          setResultMedia(newTempRes)
      } else {
          let newTempRes = tempRes.filter(item => {
              return item.media.is_approved === false
          })
          setResultMedia(newTempRes)
      }
  }

    return (
      <div className={classes.container}>
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <Copyright />
        </div>
        <SearchByName updateResultMedia={updateSearchResult} />
        {
          resultMedia.map(myOrder => {
            return (
              <Ad 
                key={myOrder.id}
                id={myOrder.id} 
                name={myOrder.media.name}
                description={myOrder.media.description}
                cost={myOrder.media.cost}
                owner_name={`${myOrder.media.owner.first_name} ${myOrder.media.owner.last_name}`}
                owner_id={myOrder.media.owner.id}
                created_at={new Date(myOrder.media.created_at).toDateString()}
                is_approved={myOrder.media.is_approved}
                attachments={myOrder.media.attachments}
                tags={myOrder.media.tags}
              />)
          })
        }
      </div>
    )
}

export default MyOrders
