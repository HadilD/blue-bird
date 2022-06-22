import React, { useState } from 'react'
import useStyles from './styles'
import Chip from '@mui/material/Chip';
import { generalStyles } from '../../generalStyles';
import Button from '@mui/material/Button';
import { downloadMedia } from '../../services/download';
import { updateMedia, deleteMedia, unpublishMedia } from '../../services/media'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';


function UpdateModal(props) {
  const {name, description, cost, tags, onCloseModal, id} = props
  const classes = useStyles();
  const [mediaName, setMediaName] = useState(name)
  const [mediaDescription, setMediaDescription] = useState(description)
  const [mediaPrice, setMediaPrice] = useState(cost)
  const [displayMediaNameError, setDisplayMediaNameError] = useState(false)
  const [oldTags, setOldTags] = useState(tags);
  const [tagInput, setTagInput] = useState("");
    
  const handleMediaNameChange = (e) => {
    setDisplayMediaNameError(false)
    setMediaName(e.target.value)
  }

  const handleMediaDescriptionChange= (e) => {
    setMediaDescription(e.target.value)
  }

  const handleMediaPriceChange = (e) => {
    setMediaPrice(e.target.value)
  }

  const handleTagChange = (e) => {

    if (e.key === 'Enter' && tagInput !== ""){
      let tagName = e.target.value
      setOldTags([...oldTags, tagName])
      setTagInput("");
    }

  }

  const handleTagDelete = (tagTodelete) => {
    const newTags = oldTags.filter(x => x !== tagTodelete);
    setOldTags(newTags)
  }

  const handleUpdate = () => {
    let body = {
      id: id,
      name: mediaName,
      description: mediaDescription,
      cost: mediaPrice,
      tags: oldTags
    }
    updateMedia(body)
    onCloseModal()
  }

  return (
    <Modal
      className={classes.uploadModalContainer}
      open={true}
      onClose={() => onCloseModal()}
      aria-labelledby="Update Media"
      aria-describedby="Modal form that will be used to update media to backend"
    >
      <Box className={classes.box}>
        <div className={classes.boxHeader}>
            <p className={classes.boxHeading}>Update Media</p>
        </div>
        <div className={classes.box1}>
          <div className={classes.inputContainer}>
            <InputLabel>Media Name</InputLabel>
            <TextField 
              id="outlined-basic" 
              label="Media Name" 
              placeholder="Enter media name.."
              variant="outlined" 
              sx={{ width: '60%' }} 
              value={mediaName}
              onChange={(e) => handleMediaNameChange(e)} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Media Description</InputLabel>
            <TextareaAutosize
              maxRows={4}
              minRows={3}
              aria-label="maximum height"
              placeholder="Add your media description.."
              value={mediaDescription}
              onChange={(e) => handleMediaDescriptionChange(e)}
              style={{ 
                width: '60%', 
                backgroundColor: '#FAF9F6', 
                fontFamily: generalStyles.openSans, 
                fontSize: '0.9rem',
                padding: '0.7rem',
                lineHeight: '1.6rem',
                fontWeight: '600',
                borderRadius: '5px',
                outline: 'none',
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Price</InputLabel>
            <TextField
              type={"number"} 
              min={0}
              variant="outlined" 
              value={mediaPrice}
              label="Price" 
              placeholder="0" 
              style={{ width:'60%' }}
              onChange={(e) =>{
                if (e.target.value < 0) {
                  e.target.value = 0
                  handleMediaPriceChange(e)
                } else {
                  handleMediaPriceChange(e)
                }
              }} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Tags</InputLabel>
            <TextField 
              variant="outlined" 
              label="Tag" 
              placeholder="Create a tag and enter..." 
              style={{ width:'60%' }}
              value={tagInput}
              onChange={(e)=> setTagInput(e.target.value)}
              onKeyDown={(e) => handleTagChange(e)}
            />
          </div>
          <div>
            {
              oldTags.map((tag, index) => {
                return (
                  <Chip label={tag} key={index} variant="outlined" onDelete={(e) => handleTagDelete(tag)} sx={{margin: '0.25rem'}} />
                )
              })
            }
          </div>
          <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <Button
              variant="contained"
              component="span"
              sx={{
                textTransform: "none",
                margin: '0 1rem',
                width: '40%',
                backgroundColor: generalStyles.primaryColor
              }}
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
          </div>
          {
            displayMediaNameError &&
            <Alert severity="warning">Media name is required !!</Alert>
          }
        </div>
      </Box>
    </Modal>
  )
}

function Ad(props) {
  const { name, description, cost, created_at, is_approved, tags, myAd, updateable, id } = props

  const classes = useStyles();
  const [modalState, setModalState] = useState(false)

  const handleModalClose = () => {
    setModalState(false)
  }

  const handleDelete = () => {
    deleteMedia({id: id})
  }

  const handleUnpublish = (publish_value) => {
    unpublishMedia({id: id, is_published: publish_value})
  }

  return (
    <div className={classes.adContainer} >
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src="https://picsum.photos/id/237/200/300"
          alt="Media pic not found"
        />
      </div>
      {
        modalState && <UpdateModal id={id} name={name} description={description} cost={cost} tags={tags} onCloseModal={handleModalClose} />
      }
      <div className={classes.mediaInfoContainer}>
        <p className={classes.mediaHeading}>{name}</p>
        <p className={classes.mediaDescription}>{description}</p>
        <p className={classes.mediaPrice}>Cost: {cost}</p>
        <p className={classes.mediaPrice}>Created at: {created_at}</p>
        <p className={classes.mediaPrice}>Status:
          {
            is_approved
              ?
              <Chip label={'Approved'} sx={{ marginLeft: '1%' }} color="success" />
              :
              <Chip label={'Not Approved'} sx={{ marginLeft: '1%' }} color="warning" />
          }</p>
        <div style={{ display: 'flex', flexDirection: 'row', margin: '2% 0' }}>
          {
            tags && tags.map((tag, index) => {
              return (
                <Chip label={tag} key={index} sx={{ marginRight: '1%' }} />
              )
            })
          }
        </div>
        <div>
          {
            updateable
            ?
              <>
                <Button variant="contained" component="span" sx={{textTransform: "none", margin: '0 1rem', width: '20%', backgroundColor: generalStyles.primaryColor}}
                  onClick={() => setModalState(true)}>
                    Update Details
                </Button>
                <Button variant="contained" component="span" sx={{ textTransform: "none", margin: '0 1rem', width: '20%',backgroundColor: generalStyles.primaryColor}}
                  onClick={() => handleDelete()}>
                  Delete
                </Button>
                <Button variant="contained" component="span" sx={{ textTransform: "none", margin: '0 1rem', width: '20%', backgroundColor: generalStyles.primaryColor}}
                  onClick={() => handleUnpublish()}>
                  Unpublish
                </Button>
              </>
            :
              null
          }
        </div>
      </div>
    </div>
  )
}

export default Ad 