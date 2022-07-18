import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Paginate from '../Paginate'
import useStyles from './styles'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Home() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/posts')
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


  return (
    <Grow in >
    <Container maxWidth='xl'>
      <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position='static' color='inherit'>
            <TextField name='search' label='Search through Moments' variant='outlined' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
            <ChipInput style={{margin: '10px 0'}} variant='outlined' label='Search Tags' value={tags} onAdd={handleAdd} onDelete={handleDelete} />
            <Button className={classes.searchButton} color='primary' variant='contained' onClick={searchPost}>Search</Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
          <Paper className={classes.pagination} elevation={6}>
            <Paginate page={page}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home