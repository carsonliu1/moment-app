import express from 'express'
import { getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, commentPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.post('/:id/comment', auth, commentPost)
router.patch('/:id', auth, updatePost)
router.patch('/:id/likePost', auth, likePost)
router.delete('/:id', auth, deletePost)

export default router