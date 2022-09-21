import React, { useEffect, useState } from 'react'
import { uploadAttachmentService, uploadImageMediaService } from '../../services/media'

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { generalStyles } from '../../generalStyles';
import useStyles from './styles';

function UploadModal(props) {
  const { closeModal } = props
  const [mediaName, setMediaName] = useState("")
  const [mediaDescription, setMediaDescription] = useState("")
  const [mediaPrice, setMediaPrice] = useState(0)
  const [files, setFiles] = useState(null)
  const [acceptedFileTypes, setAcceptedFilesType] = useState('.png, .jpg, .jpeg')
  const [displayMessage, setDisplayMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const [fileSelectedMsg, setFileSelectedMsg] = useState(false)
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false)
  const [displayMediaNameError, setDisplayMediaNameError] = useState(false)
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const resetModal = () => {
    setMediaName(null)
    setFiles(null)
    setAcceptedFilesType('.png, .jpg, .jpeg')
  }

  useEffect(() => {
    if (files && files.length > 0){
      setFileSelectedMsg(true)
    } else {
      setFileSelectedMsg(false)
    }
  }, [files])

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

  const handleUpload = async(e) => {
    setUploadButtonClicked(true)
    if (files===null) {
      setUploadButtonClicked(false)
      setDisplayErrorMessage(true)
      return
    }
    if (mediaName==="" || mediaName===null) {
      setUploadButtonClicked(false)
      setDisplayMediaNameError(true)
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
    setFiles(null)
    setUploadButtonClicked(false)
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
        <div className={classes.boxHeader}>
            <p className={classes.boxHeading}>Upload Media</p>
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
              onChange={(e) => handleMediaNameChange(e)} 
            />
          </div>
          <div className={classes.inputContainer}>
            <InputLabel className={classes.preLine}>{`Media Description`}</InputLabel>
            <TextareaAutosize
              maxRows={4}
              minRows={3}
              aria-label="maximum height"
              placeholder="Add your media description.."
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
            {/* <TextField 
              variant="outlined" 
              label="Media Description" 
              placeholder="Type media details..." 
              style={{ width:'60%' }}
              onChange={(e) => handleMediaDescriptionChange(e)}
            /> */}
          </div>
          <div className={classes.inputContainer}>
            <InputLabel>Price</InputLabel>
            <TextField
              type={"number"} 
              min={0}
              variant="outlined" 
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
              tags.map((tag, index) => {
                return (
                  <Chip label={tag} key={index} variant="outlined" onDelete={(e) => handleTagDelete(tag)} sx={{margin: '0.25rem'}} />
                )
              })
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '7%', marginBottom: '5%' }}>
            <div className={classes.buttonsContainer}>
              <input
                accept={acceptedFileTypes}
                style={{ display: 'none' }}
                id="upload-button"
                type="file"
                multiple={true}
                onChange={(e) => {
                  setDisplayErrorMessage(false)
                  let files = e.target.files
                  setFiles(files)
                }}
              />
              <label htmlFor="upload-button">
                <Button 
                  variant="contained" 
                  component="span" 
                  sx={{
                    textTransform: "none", 
                    backgroundColor: generalStyles.primaryColor
                  }}
                >
                  Select from PC
                </Button>
              </label>

              <label>
                <Button 
                  variant="contained" 
                  component="span" 
                  onClick={e => handleUpload(e)} 
                  sx={{
                    textTransform: "none",
                    backgroundColor: generalStyles.primaryColor
                    }}
                  >
                    Upload
                </Button>
              </label>
            </div>
          </div>
          {
            displayMessage &&
            <Alert severity="success">Media Uploaded Successfully — awaiting Admin approval!</Alert>
          }
          {
            fileSelectedMsg && uploadButtonClicked === false 
            ? <Alert severity="success">Files selected !!</Alert>
            : null
          }

          {
            displayMediaNameError &&
            <Alert severity="warning">Media name is required !!</Alert>
          }

          {
            displayErrorMessage &&
            <Alert severity="warning">Please select files for your media !!</Alert>
          }
        </div>
      </Box>
    </Modal>
  )
}

export default UploadModal