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
          <br></br>
          <br></br>
          <br></br>
          {comments.map((comment, index) => (
            <Typography key={index} variant='subtitle1'>
              <strong>{comment.split(': ')[0]}: </strong>
              {comment.split(': ')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && <div style={{ width: '50%' }}>
          <TextField
            className={classes.commentForm}
            label='Comment'
            variant='outlined'
            multiline
            minRows={12}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user?.result}
          >
          </TextField>
          <Button className={classes.commentButton} disabled={!comment} variant='contained' onClick={handleClick}>
            Comment
          </Button>
        </div>}
      </div>
    </div>
  )
}

export default Comments
