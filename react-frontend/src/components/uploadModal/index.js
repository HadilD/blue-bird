import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { uploadImageMediaService } from '../../services/user'

function UploadModal(props) {
  const { closeModal } = props
  const [mediaName, setMediaName] = useState("")
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [file, setFile] = useState(null)
  const [mediaType, setMediaType] = useState("image")
  const [acceptedFileTypes, setAcceptedFilesType] = useState('.png, .jpg, .jpeg')
  const [displayMessage, setDisplayMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

  const resetModal = () => {
    setMediaName(null)
    setUploadedFileName("")
    setFile(null)
    setMediaType("image")
    setAcceptedFilesType('.png, .jpg, .jpeg')
  }

  const handleMediaNameChange = (e) => {
    setMediaName(e.target.value)
  }

  const handleUpload = (e) => {
    if (file === null) {
      setDisplayErrorMessage(true)
      return
    }
    let formdata = new FormData()
    console.log('Media Name:', mediaName)
    if (mediaName.length > 0) {
      formdata.append('file', file, mediaName)
    }
    else {
      formdata.append('file', file)
    }

    async function uploadImageMedia() {
      const response = await uploadImageMediaService(formdata)
      if (response) {
        setDisplayMessage(true)
        setTimeout(() => {
          setDisplayMessage(false)
          resetModal()
          closeModal()
        }, 3000)
      }
    }
    uploadImageMedia();
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
          <FormControl sx={{ marginBottom: '10%' }}>
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
          </FormControl>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <input
                accept={acceptedFileTypes}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(e) => {
                  let file = e.target.files[0]
                  setUploadedFileName(file['name'])
                  console.log("This is file name:", file['name'])
                  setFile(file)
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">Select from PC</Button>
              </label>

              <label>
                <Button variant="raised" component="span" onClick={e => handleUpload(e)}>Upload</Button>
              </label>
            </div>
            <p style={{ marginTop: '1%', marginLeft: '15%' }}>{uploadedFileName}</p>
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