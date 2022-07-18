import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'
import { Typography, TextField, Button } from '@material-ui/core'
import useStyles from './styles'

function Comments({ post }) {

  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const commentsRef = useRef()

  const handleClick = async () => {
    const resultComment = `${user.result.name}: ${comment}`
   const newComments = await dispatch(commentPost(resultComment, post._id))
   setComments(newComments)
   setComment('')
   commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant='h6'>Comments</Typography>
          {comments.map((comment, index) => (
              <Typography key={index} variant='subtitle1'>
                <strong>{comment.split(': ')[0]}: </strong>
                {comment.split(': ')[1]}
              </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user?.result?.name && <div style={{width: '70%'}}>
          <Typography variant='h6'>Write a comment</Typography>
          <TextField
            label='Comment'
            variant='outlined'
            multiline
            minRows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            disabled={!user?.result}
            >
          </TextField>
          <Button style={{marginTop: '10px'}} disabled={!comment} color='primary' variant='contained' fullWidth onClick={handleClick}>
            Comment
          </Button>
        </div>}
      </div>
    </div>
  )
}

export default Comments