import React, { useEffect, useState } from 'react'

import Chip from '@mui/material/Chip';
import PlacehoderImage from "./../../assests/placeholder.png";
import { downloadMedia } from '../../services/download'
import useStyles from './styles'
import { BadWords } from '../../constants/api'

function AdminMedia(props) {
  const { name, description, cost, owner, date, is_approved, attachments, id, updateMediaStatus, mediaItem } = props

  const [attachmentLables, setAttachmentLabels] =  useState([]);

  useEffect(() => {
    let labels = [];
    attachments && attachments.length && attachments.forEach(element => {
      element.labels && element.labels.map((label, index) => {
          labels.push(label.toLowerCase());
      })
     })
     setAttachmentLabels(labels)
  }, [])

  const approveStatus = is_approved
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.adContainer}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={`${(attachments && attachments.length !== 0 && attachments[0].url !== '') ? attachments[0].url : PlacehoderImage}`}
            alt="Media pic not found"
          />
        </div>
        <div className={classes.mediaInfoContainer}>
          <p className={classes.mediaHeading}>{name}</p>
          <p className={classes.mediaDescription}>{description}</p>
          <p className={classes.mediaPrice}>Cost: {cost}</p>
          <p className={classes.mediaPrice}>Owner: {owner}</p>
          <p className={classes.mediaPrice}>Uploaded on: {date}</p>
          <div className={classes.labelsContainer}>
            {
              attachmentLables && attachmentLables.map((label, index) => {
                return (
                  BadWords.includes(label)
                  ?
                    <Chip label={label} style={{marginRight: 5}} color="error" />
                  :
                    <Chip label={label} style={{marginRight: 5}} />
                )
              })
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
          <p className={classes.mediaPrice}>Status:
            {
            approveStatus
              ?
              <Chip label={'Approved'} sx={{ marginLeft: '1%' }} color="success" />
              :
              <Chip label={'Not Approved'} sx={{ marginLeft: '1%' }} color="warning" />
            }
          </p>
            {
              approveStatus
                ?
                <button
                  className={classes.disapproveButton}
                  onClick={() => updateMediaStatus({
                    "ids": [id],
                    "approve": false
                  })}
                >
                  Disapprove
                </button>
                :
                <button
                  className={classes.approveButton}
                  onClick={() => updateMediaStatus({
                    "ids": [id],
                    "approve": true
                  })}
                >
                  Approve
                </button>
            }
            <button type="submit" disabled={false} onClick={() => downloadMedia(mediaItem)} className={classes.approveButton}>Download Media</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMedia 	