import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../../redux/slice/pagename';
import Ad from '../../components/ad'
import SearchByName from '../../components/searchByName'
import { getMineMedia } from '../../services/media'
import Copyright from '../../components/copyright';

function MyAds() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const allMedia = useSelector(state => state.media.myMedias)
  const [resultMedia, setResultMedia] = useState([])

  useEffect(() => {
    dispatch(setPageName("My Ads"))
  })

  useEffect(async () => {
    const res = await getMineMedia()
    setResultMedia(res)
  }, [])

  const updateSearchResult = (searchQuery, category) => {
    let tempRes = null
    if (searchQuery === '') {
      tempRes = allMedia
    } else {
      tempRes = resultMedia.filter(item => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }
    if (category === 'all') {
      setResultMedia(tempRes)
    } else if (category === 'approved') {
      let newTempRes = tempRes.filter(item => {
        return item.is_approved === true
      })
      setResultMedia(newTempRes)
    } else {
      let newTempRes = tempRes.filter(item => {
        return item.is_approved === false
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
        resultMedia.map(myAds => {
          console.log('-----------', myAds)
          return (
            <Ad
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
              myAd={myAds}
              attachments={myAds.attachments}
              is_published={myAds.is_published}
              updateable={true}
            />)
        })
      }
    </div>
  )
}

export default MyAds
