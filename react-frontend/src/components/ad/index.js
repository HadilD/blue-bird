import React from 'react'
import useStyles from './styles'

function Ad(props){
  const {name, description, cost, created_at, is_approved, tags} = props
  const classes = useStyles();
  return (
    <div className={classes.adContainer}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image} 
          src="https://picsum.photos/id/237/200/300" 
          alt="Media pic not found" 
        />
      </div>
      <div className={classes.mediaInfoContainer}>
        <p className={classes.mediaHeading}>{name}</p>
        <p className={classes.mediaDescription}>{description}</p>
        <p className={classes.mediaPrice}>Cost: {cost}</p>
        <p className={classes.mediaPrice}>Created At: {created_at}</p>
        <p className={classes.mediaPrice}>Status: {is_approved ? 'Approved' : "Not Approved"}</p>
        {
          tags &&  <p className={classes.mediaPrice}>Tags: {tags}</p>
        }
      </div>
    </div>
  )
}

export default Ad 