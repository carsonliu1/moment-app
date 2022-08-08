import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
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
      <Paper className={classes.paper} elevation={6}>
        <Notice>
          <Link to ='/auth' style={{ textDecoration: 'none', color: '#d76673', fontWeight: '700'}}> Sign in</Link> to create your own Moments
        </Notice>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing a Moment' : 'Create a Moment'}</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
        <TextField name='message' variant='outlined' label='Message' fullWidth multiline minRows={5} fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
        <FileInput>
          <FileBase type='file' multple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}/>
        </FileInput>
        <SubmitButton variant='contained' size='medium' type='submit' >SUBMIT</SubmitButton>
        <ClearButton variant='contained' size='medium' onClick={clear} >CLEAR</ClearButton>
      </form>
    </Paper>
  )
}

const Notice = styled.p`
  text-align: center;
  font-weight: 500;
`

const SubmitButton = styled.button`
  margin-bottom: 10px;
  background-color: #d76673;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  width: 96%;
  height: 35px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #d76673;
    transform: scale(1.02);
  }
`

const ClearButton = styled.button`
  background-color: transparent;
  margin-bottom: 10px;
  color: gray;
  border-radius: 8px;
  font-weight: 600;
  width: 96%;
  height: 35px;
  border: 1px solid #D3D3D3;
  &:hover {
    transform: scale(1.02);
  }
`

const FileInput = styled.div`
  width: 96%;
  margin: 10px 0;
  & input[type="file" i]::-webkit-file-upload-button {
    border-radius: 8px;
    color: white;
    background-color: #d76673;
    border: none;
    cursor: pointer;
    font-weight: 700;
    width: 40%;
    height: 25px;
    font-size: 11px;
    text-transform: uppercase;
    &:hover {
      transform: scale(1.03);
    }
  }
`

export default Form