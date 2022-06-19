import React, { useEffect } from 'react'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import Ad from '../../components/ad'
import { getMyOrders } from '../../services/order'

function MyOrders() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const myOrders = useSelector(state => state.order.myOrders)

    useEffect(() => {
        dispatch(setPageName("My Orders"))
    })

    useEffect(() => {
        getMyOrders()
    }, [])

    return (
      <div className={classes.container}>
        {
          myOrders.map(myOrder => {
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
                tags={myOrder.media.tags}
              />)
          })
        }
      </div>
    )
}

export default MyOrders
