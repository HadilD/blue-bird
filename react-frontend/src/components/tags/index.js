import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';

function Tags({data, handleDelete}){
  return (
    <Box
      sx={{
        background: "#283240",
        height: "60%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction='row' gap={1}>
        <Typography>{data}</Typography>
        <CancelIcon sx={{ cursor: "pointer" }} onClick={() => {handleDelete(data)}}/>
      </Stack>
    </Box>
  );
};

export default Tags
