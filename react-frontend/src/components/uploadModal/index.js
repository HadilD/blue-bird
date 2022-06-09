import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormLabel from '@mui/material/FormLabel'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { uploadImageMediaService, uploadAttachmentService } from '../../services/media'

function UploadModal(props) {
  const { closeModal } = props
  const [mediaName, setMediaName] = useState("")
  const [files, setFiles] = useState(null)
  const [acceptedFileTypes, setAcceptedFilesType] = useState('.png, .jpg, .jpeg')
  const [displayMessage, setDisplayMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

  const resetModal = () => {
    setMediaName(null)
    setFiles(null)
    setAcceptedFilesType('.png, .jpg, .jpeg')
  }

  const handleMediaNameChange = (e) => {
    setMediaName(e.target.value)
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
    // async function uploadAttachment() {
    //   const response = await uploadImageMediaService(formdata)
 
    let attachmentIds = await getAttachmentIds([])
    let body = {
      name: mediaName,
      attachments: attachmentIds,
      tags: ['xyz']
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

  return (
    <Modal
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={true}
      onClose={() => closeModal()}
      aria-labelledby="Upload Media Modal"
      aria-describedby="Modal form that will be used to upload media to backend"
    >
      <Box sx={{ display: 'flex', width: '40%', height: '30rem', backgroundColor: 'white', borderRadius: 3 }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '1em', width: '100%', marginBottom: '10%' }}>
          <div style={{ borderBottom: '1px solid black', marginBottom: '5%' }}>
            <p>Upload Media</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%' }}>
            <InputLabel sx={{ marginRight: '5%' }}>Enter Media Name:</InputLabel>
            <TextField id="outlined-basic" label="Media Name" variant="outlined" sx={{ width: '60%' }} onChange={(e) => handleMediaNameChange(e)} />
          </div>
          {/* <FormControl sx={{ marginBottom: '10%' }}>
            <FormLabel id="demo-controlled-radio-buttons-group">Select Media Type:</FormLabel>
            <RadioGroup
              row
              value={mediaType}
              defaultValue={"image"}
              onChange={(e, value) => {
                setMediaType(value)
                if (value === "image") setAcceptedFilesType('.png, .jpg, .jpeg')
                if (value === "video") setAcceptedFilesType('.mp4')
                if (value === "file") setAcceptedFilesType('.pdf, .doc, .docx, .xlsx')
                if (value === "audio") setAcceptedFilesType('.mp3')
              }}
            >
              <FormControlLabel value="image" control={<Radio />} label="Images" />
              <FormControlLabel value="video" control={<Radio />} label="Videos" />
              <FormControlLabel value="audio" control={<Radio />} label="Audios" />
              <FormControlLabel value="file" control={<Radio />} label="Files" />
            </RadioGroup>
          </FormControl> */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <input
                accept={acceptedFileTypes}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                multiple={true}
                onChange={(e) => {
                  setDisplayErrorMessage(false)
                  console.log('these are target files:', e.target.files[0])
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