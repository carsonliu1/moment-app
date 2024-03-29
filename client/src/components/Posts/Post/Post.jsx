import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md"
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost, getPosts } from '../../../actions/posts'

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
          <><AiFillHeart color='pink' size={23} />&nbsp;{likes.length} LIKES</>
        ) : (
          <><AiOutlineHeart color='pink' size={23} />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><AiOutlineHeart color='pink' size={23}/>&nbsp;Like</>;
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

  const reload = () => {
    setTimeout(window.location.reload(), 1000)
  }

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
        <h5 className={classes.title} onClick={openPost}>{post?.title}</h5>
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
        <div style={{display: 'flex', justifyContent:'center'}}>
          <Button size='small' color='primary' onClick={() => {
            dispatch(deletePost(post?._id))
            reload()
            }}>
            Delete
          </Button>
          <div style={{marginTop:'4px', marginRight: '5px', cursor:'pointer '}}>
            <MdOutlineDeleteOutline color='gray' size={20} onClick={() => {
              dispatch(deletePost(post?._id))
              reload()
              }}/>
          </div>
        </div>
        )}
      </CardActions>
    </Card>
  )
}

export default Post

