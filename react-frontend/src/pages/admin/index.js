import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import AdminMedia from '../../components/adminMedia';
import SearchByName from '../../components/searchByName'
import {setPageName} from '../../redux/slice/pagename'
import { getAdminMedia, adminUpdateMediaStatus } from '../../services/admin';

function Admin() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const mediaItems = useSelector(state => state.admin.adminMedia)
    const [allMedia, setAllMedia] = useState([])

    async function adminMedia(params=null) {
        let res = await getAdminMedia(params)
        setAllMedia(res)
    }

    useEffect(() => {
        adminMedia()
    }, [])

    const updateMediaStatus = async (body) => {
        await adminUpdateMediaStatus(body)
        adminMedia()
    }

    useEffect(() => {
        dispatch(setPageName("Admin Dashboard"))
    })
    return (
        <div className={classes.container}>
            <SearchByName adminMedia={adminMedia} />
            {
                allMedia.map((mediaItem) => {
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
                            key={mediaItem.id} />
                    )
                })
            }
        </div>
    )
}

export default Admin