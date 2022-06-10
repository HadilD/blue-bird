import React, { useEffect } from 'react'
import useStyles from './styles'

function Admin() {
    const classes = useStyles()
    // useEffect(() => {
    //     // call the get media api for admin
    // })
    return (
        <div className={classes.container}>
            <p>This is an admin page</p>
        </div>
    )
}

export default Admin