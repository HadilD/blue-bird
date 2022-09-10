import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import AdminMedia from '../../components/adminMedia';
import SearchByName from '../../components/searchByName'
import { setPageName } from '../../redux/slice/pagename'
import { getAdminMedia, adminUpdateMediaStatus } from '../../services/admin';
import Copyright from '../../components/copyright';

function Admin() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const allMedia = useSelector(state => state.admin.adminMedia)
    const [resultMedia, setResultMedia] = useState([])

    useEffect(async () => {
        const res = await getAdminMedia()
        setResultMedia(res)
    }, [])

    useEffect(() => {
        setResultMedia(allMedia)
    }, [allMedia])

    const updateMediaStatus = async (body) => {
        await adminUpdateMediaStatus(body)
        await getAdminMedia()
    }

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

    useEffect(() => {
        dispatch(setPageName("Admin Dashboard"))
    })
    return (
        <div className={classes.container}>
            <Copyright />
            <SearchByName updateResultMedia={updateSearchResult} />
            {
                resultMedia.map((mediaItem) => {
                    return (
                        <AdminMedia
                            name={mediaItem.name}
                            description={mediaItem.description}
                            cost={mediaItem.cost}
                            owner={`${mediaItem.owner.first_name} ${mediaItem.owner.last_name}`}
                            date={new Date(mediaItem.created_at).toDateString()}
                            id={mediaItem.id}
                            is_approved={mediaItem.is_approved}
                            attachments={mediaItem.attachments}
                            updateMediaStatus={updateMediaStatus}
                            key={mediaItem.id}
                            mediaItem={mediaItem}
                        />
                    )
                })
            }
        </div>
    )
}

export default Admin