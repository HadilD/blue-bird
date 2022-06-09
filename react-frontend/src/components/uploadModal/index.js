import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import useStyles from './styles';
import { uploadImageMediaService, uploadAttachmentService } from '../../services/media'
import Chip from '@mui/material/Chip';

function UploadModal(props) {
  const { closeModal } = props
  const [mediaName, setMediaName] = useState("")
  const [mediaDescription, setMediaDescription] = useState("")
  const [mediaPrice, setMediaPrice] = useState("")
  const [files, setFiles] = useState(null)
  const [acceptedFileTypes, setAcceptedFilesType] = useState('.png, .jpg, .jpeg')
  const [displayMessage, setDisplayMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const resetModal = () => {
    setMediaName(null)
    setFiles(null)
    setAcceptedFilesType('.png, .jpg, .jpeg')
  }

  const handleMediaNameChange = (e) => {
    setMediaName(e.target.value)
  }

  const handleMediaDescriptionChange= (e) => {
    setMediaDescription(e.target.value)
  }

  const handleMediaPriceChange = (e) => {
    setMediaPrice(e.target.value)
  }

  const handleUpload = async(e) => {
    if (files === null) {
      setDisplayErrorMessage(true)
      return
    }

  const getAttachmentIds = async(arr) => {
    for (let i=0; i<files.length; i++) {
      let attachmentToUpload = files[i]
      let formdata = new FormData()
      formdata.append('file', attachmentToUpload)
      const res = await uploadAttachmentService(formdata)
      arr = [...arr, res.id]
    }
    return arr
  }
 
    let attachmentIds = await getAttachmentIds([])
    let body = {
      name: mediaName,
      description: mediaDescription,
      cost: mediaPrice,
      attachments: attachmentIds,
      tags
    }
    let mediaResponse =  await uploadImageMediaService(body)
    if (mediaResponse) {
      setDisplayMessage(true)
      setTimeout(() => {
        setDisplayMessage(false)
        resetModal()
        closeModal()
      }, 3000)
    }
  }

  const handleTagChange = (e) => {

    if (e.key === 'Enter' && tagInput !== ""){
      let tagName = e.target.value
      setTags([...tags, tagName])
      setTagInput("");
    }

  }

  const handleTagDelete = (tagTodelete) => {
    const newTags = tags.filter(x => x !== tagTodelete);
    setTags(newTags)
  }

  const classes = useStyles();

  return (
    <Modal
      className={classes.uploadModalContainer}
      open={true}
      onClose={() => closeModal()}
      aria-labelledby="Upload Media Modal"
      aria-describedby="Modal form that will be used to upload media to backend"
    >
      <Box className={classes.box}>
        <div className={classes.box1}>
          <div style={{ borderBottom: '1px solid black', marginBottom: '5%' }}>
            <p>Upload Media</p>
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Media Name</InputLabel>
            <TextField 
              id="outlined-basic" 
              label="Media Name" 
              variant="outlined" 
              sx={{ width: '60%' }} 
              onChange={(e) => handleMediaNameChange(e)} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Media Description</InputLabel>
            <TextField 
              variant="outlined" 
              label="Media Description" 
              placeholder="Media Description" 
              style={{ width:'60%' }}
              onChange={(e) => handleMediaDescriptionChange(e)} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Price</InputLabel>
            <TextField
              type={"number"} 
              variant="outlined" 
              label="Price" 
              placeholder="0" 
              style={{ width:'60%' }}
              onChange={(e) => handleMediaPriceChange(e)} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Tags</InputLabel>
            <TextField 
              variant="outlined" 
              label="Tag" 
              placeholder="Create a tag" 
              style={{ width:'60%' }}
              value={tagInput}
              onChange={(e)=> setTagInput(e.target.value)}
              onKeyDown={(e) => handleTagChange(e)}
            />
          </div>
          <div>
            {
              tags.map((tag, index) => {
                return (
                  <Chip label={tag} key={index} variant="outlined" onDelete={(e) => handleTagDelete(tag)} />
                )
              })
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={classes.buttonsContainer}>
              <input
                accept={acceptedFileTypes}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                multiple={true}
                onChange={(e) => {
                  setDisplayErrorMessage(false)
                  let files = e.target.files
                  setFiles(files)
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">Select from PC</Button>
              </label>

              <label>
                <Button variant="raised" component="span" onClick={e => handleUpload(e)}>Upload</Button>
              </label>
            </div>
          </div>
          {
            displayMessage &&
            <Alert severity="success">Media Uploaded Successfully — check it out!</Alert>
          }

          {
            displayErrorMessage &&
            <Alert severity="warning">Media not selected!</Alert>
          }
        </div>
      </Box>
    </Modal>
  )
}

export default UploadModal