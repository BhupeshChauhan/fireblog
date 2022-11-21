import { TextField } from '@mui/material'
import React from 'react'

const StandardTextField = (props) => {
  return (
    <div>
        <TextField
        id="input-with-icon-textfield"
        variant="standard"
        {...props}
      />
    </div>
  )
}

export default StandardTextField