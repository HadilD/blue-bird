import React from 'react'
import useStyles from './styles'

function Ad(){
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
        <p className={classes.mediaHeading}>Ad Name</p>
        <p className={classes.mediaDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quidem laudantium similique ab quia exercitationem suscipit incidunt mollitia beatae? Aut eaque, nisi inventore accusamus dolorem neque! Quia, nostrum nihil? Qui!
        </p>
        <p className={classes.mediaType}>Image</p>
        <p className={classes.mediaPrice}>10€</p>
      </div>
    </div>
  )
}

export default Ad 