import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import Home from './components/Home/Home.jsx'
import Auth from './components/Auth/Auth.jsx'
import PostDetails from './components/PostDetails/PostDetails.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Container } from '@material-ui/core'

function App() {

  const [id, setId] = useState('')

  useEffect(() => {
    axios.get('https://mymomentapp.herokuapp.com/clientId')
    .then(res => setId(res.data))
    .catch(err => console.log(err))
  }, [])

  const user = JSON.parse(localStorage.getItem('profile'))

  const toLogin = () => !user ? <Auth /> : <Navigate to ='/posts'/>

  return (
    <GoogleOAuthProvider clientId={id}>
      <BrowserRouter>
        <Container maxWidth='xl'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/posts' element={<Home />}/>
            <Route path='/posts/search' element={<Home />}/>
            <Route path='/posts/:id' element={<PostDetails />}/>
            <Route path='/auth' element={toLogin()}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App