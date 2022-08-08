import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memoriestext from '../../images/memories-Text.png'
import memoriesLogo from '../../images/logo.png'
import { useDispatch } from 'react-redux'
import { AppBar, Typography, Avatar, Button, Toolbar } from '@material-ui/core'
import useStyles from './styles'
import decode from 'jwt-decode'


const AuthButton = styled.button`
  margin-left: 20px;
  background-color: #D76673;
  color: white;
  border: none;
  width: 85px;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    transform: scale(1.04);
  }
`

function NavBar() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/auth')
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    const token = user?.token
    if(token) {
      const decoded = decode(token)
      if(decoded.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/posts' className={classes.brandContainer} >
        <img className={classes.image} src={memoriestext} alt='icon' height='110px'/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              {/* <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography> */}
            <AuthButton onClick={logout}>LOGOUT</AuthButton>
          </div>
        ) : (
          <AuthButton>
            <Link to ='/auth' style={{ textDecoration: 'none', color: 'white', fontWeight: '700'}}>SIGN IN</Link>
          </AuthButton>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default NavBar