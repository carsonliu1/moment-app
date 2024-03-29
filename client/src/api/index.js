import axios from 'axios'

const API = axios.create({ baseURL: 'https://mymomentapp.herokuapp.com' })

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const getPost = (id) => API.get(`/posts/${id}`)

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signin = (formData) => API.post('/users/signin', formData)

export const signup = (formData) => API.post('/users/signup', formData)

export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const comment = (comment, id) => API.post(`/posts/${id}/comment`, { comment })

