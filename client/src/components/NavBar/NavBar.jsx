import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memoriestext from '../../images/memories-Text.png'
import memoriesLogo from '../../images/logo.png'
import { useDispatch } from 'react-redux'
import { AppBar, Typography, Avatar, Button, Toolbar } from '@material-ui/core'
import useStyles from './styles'
import decode from 'jwt-decode'

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
        {/* <img src={memoriesLogo} alt='icon' height='100px' width='346px'/> */}
        <img className={classes.image} src={memoriestext} alt='icon' height='100px'/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user.result.name.split(' ')[0]}</Typography>
            <Button className={classes.logout} variant='contained' onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button className={classes.buttons} component={Link} to='/auth' variant='contained' >Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar