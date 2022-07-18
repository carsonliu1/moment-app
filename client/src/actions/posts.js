import * as api from '../api'


//actions creators are functions that return an action and an action is an object that has a type and a payload/result
//because the action is async we have to use middleware dispatch and make it async and later on return it
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING'})
    const { data } = await api.fetchPosts(page)
    const action = { type: 'FETCH_ALL', payload: data}
    dispatch(action)
    dispatch({ type: 'END_LOADING'})
  } catch(err) {
    console.log(err)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING'})
    const { data: { data } } = await api.getPostsBySearch(searchQuery)
    const action = { type: 'FETCH_SEARCH', payload: data}
    dispatch(action)
    dispatch({ type: 'END_LOADING'})
  } catch(err) {
    console.log(err)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING'})
    const { data } = await api.getPost(id)
    const action = { type: 'GET_POST', payload: data}
    dispatch(action)
    dispatch({ type: 'END_LOADING'})
  } catch(err) {
    console.log(err)
  }
}

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING'})
    const { data } = await api.createPost(post)
    console.log(data)
    navigate(`/posts/${data?._id}`)
    dispatch({ type: 'CREATE', payload: data})
    dispatch({ type: 'END_LOADING'})
  } catch(err) {
    console.log(err)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    dispatch({ type: 'UPDATE', payload: data })
  } catch(err) {
    console.log(err)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: 'DELETE', payload: id})
  } catch(err) {
    console.log(err)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: 'UPDATE', payload: data})
  } catch(err) {
    console.log(err)
  }
}

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(comment, id)
    dispatch({ type:'COMMENT', payload: data })
    return data.comments
  } catch(err) {
    console.log(err)
  }
}