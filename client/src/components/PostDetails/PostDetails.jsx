import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Card, CardContent, CardMedia } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getPost, getPostsBySearch } from '../../actions/posts'
import { useParams, useNavigate } from 'react-router-dom'
import Comments from './Comments.jsx'
import useStyles from './styles'

function PostDetails() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { post, posts, isLoading } = useSelector((state) => state.posts)

  const openPost = (_id) => {
    navigate(`/posts/${_id}`)
  }

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}))
    }
  }, [post])

  if(!post) return null

  if(isLoading) {
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', width:'95%', marginLeft:'20px' }} elevation={7}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography className={classes.title} variant="h3" component="h2">{post.title}</Typography>
          <Typography className={classes.message} variant="body1" component="p">{post.message}</Typography>
          <Typography className={classes.tags} variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
      <Divider style={{ margin: '20px 0' }} />
      {!!recommendedPosts.length && (
        <div>
          <Typography variant='h5'>You might also like:</Typography>
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(({ title, message, name, likes, selectedFile, _id}) => (
              <Card className={classes.relatedCard} key={_id} elevation={6}>
                <Typography style={{marginLeft:'17px', position: 'absolute', color: 'white', marginTop: '10px'}} variant="subtitle1">{name}</Typography>
                <CardMedia className={classes.cardMedia} image={selectedFile} onClick={() => openPost(_id)}/>
                <Typography className={classes.relatedTitle} onClick={() => openPost(_id)} variant="h6">{title}</Typography>
                <CardContent className={classes.body}>
                  <Typography variant="subtitle2">{message}</Typography>
                </CardContent>
                <Typography style={{marginLeft: '17px', paddingBottom: '10px'}} variant="subtitle2">Likes: {likes?.length}</Typography>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails