import React from 'react'
import useStyles from './styles'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


function Input({ name, label, type, handleChange, half, autoFocus, handleShowPassword }) {
  const classes = useStyles()
  return (
    <Grid className={classes.root} item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        type={type}
        onChange={handleChange}
        autoFocus={autoFocus}
        variant='outlined'
        required
        fullWidth
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  )
}

export default Input