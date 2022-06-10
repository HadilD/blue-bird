import React from 'react'
import useStyles from './styles'


function AdminMedia(){
  const approveStatus = true
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.adContainer}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image} 
            src="https://picsum.photos/id/237/200/300" 
            alt="Media pic not found" 
          />
        </div>
        <div className={classes.mediaInfoContainer}>
          <p className={classes.mediaHeading}>Ad Name</p>
          <p className={classes.mediaDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quidem laudantium similique ab quia exercitationem suscipit incidunt mollitia beatae? Aut eaque, nisi inventore accusamus dolorem neque! Quia, nostrum nihil? Qui!
          </p>
          <p className={classes.mediaType}>Image</p>
          <p className={classes.mediaPrice}>10€</p>
          <div style={{display:'flex', flexDirection: 'row'}}>
            <p className={classes.mediaPrice}>Status: {approveStatus ? 'Approved' : 'Not Approved'}</p>
            {
              approveStatus
              ?
                <button type="submit" disabled={false} className={classes.disapproveButton}>Disapprove</button>
              :
                <button type="submit" disabled={false} className={classes.approveButton}>Approve</button>
            }
            <button type="submit" disabled={false} className={classes.approveButton}>Download Media</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMedia 	