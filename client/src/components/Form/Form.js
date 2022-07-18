import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'


function Form({ currentId, setCurrentId }) {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id  === currentId) : null)

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
      clear()
      return
    }
    dispatch(createPost({...postData, name: user?.result?.name}, navigate))
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center' elevation={6}>
          Please Sign In to create your own Moments
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6' elevation={6}>{currentId ? 'Editing a Moment' : 'Creating a Moment'}</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
        <TextField name='message' variant='outlined' label='Message' fullWidth multiline minRows={5} fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
        <div className={classes.fileInput}>
          <FileBase type='file' multple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}/>
        </div>
        <Button style={{marginBottom:'10px'}} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form