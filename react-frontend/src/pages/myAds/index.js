import React, { useEffect } from 'react'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import Ad from '../../components/ad'
import { getMineMedia } from '../../services/media'

function MyAds(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const myMedias = useSelector(state => state.media.myMedias)

    useEffect(() => {
        dispatch(setPageName("My Ads"))
    })

    useEffect(() => {
        getMineMedia()
    }, [])

    return (
        <div className={classes.container}>
            {
                myMedias.map(myAds => {
                    return (<Ad 
                                key={myAds.id}
                                id={myAds.id} 
                                name={myAds.name}
                                description={myAds.description}
                                cost={myAds.cost}
                                owner_name={`${myAds.owner.first_name} ${myAds.owner.last_name}`}
                                owner_id={myAds.owner.id}
                                created_at={new Date(myAds.created_at).toDateString()}
                                is_approved={myAds.is_approved}
                                tags={myAds.tags}
                            />)
                })
            }
        </div>
    )
}

export default MyAds
