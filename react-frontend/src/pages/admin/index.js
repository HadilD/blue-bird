import React, { useEffect } from 'react'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import AdminMedia from '../../components/adminMedia';
import SearchByName from '../../components/searchByName'
import {setPageName} from '../../redux/slice/pagename'

function Admin() {
    const classes = useStyles()
    // useEffect(() => {
    //     // call the get media api for admin
    // })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageName("Admin Dashboard"))
    })
    return (
        <div className={classes.container}>
            <SearchByName />
            <AdminMedia />
            <AdminMedia />
            <AdminMedia />
            <AdminMedia />
        </div>
    )
}

export default Admin