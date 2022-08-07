import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

function Post({ post, setCurrentId }) {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [likes, setLikes] = useState(post?.likes)

  const Likes = () => {
    if (post.likes.length > 0) {
      return likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><AiFillHeart color='pink' size={23} />&nbsp;{likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><AiOutlineHeart color='pink' size={23} />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const handleLike = () => {
    if(post._id) {
      dispatch(likePost(post._id))
    }
    if(post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))) {
      setLikes(post.likes.filter((id) => id !== (user?.result?.sub || user?.result?._id)))
    } else {
      setLikes([...post.likes, user?.result?.sub || user?.result?._id])
    }
  }

  const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.cardAction}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost}/>
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post?._id)}><MoreHorizIcon fontSize='medium' /></Button>
          </div>
        )}
        <Typography className={classes.title} variant='h5' onClick={openPost}>{post?.title}</Typography>
        <CardContent className={classes.body}>
          <Typography variant='body2' color='textSecondary'>{post?.message}</Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post?.tags?.map(tag => `#${tag} `)}</Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
          {Likes()}
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button size='small' color='primary' onClick={() => dispatch(deletePost(post?._id))}>
          Delete
          <AiFillDelete color='black' size={23} />
        </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post

