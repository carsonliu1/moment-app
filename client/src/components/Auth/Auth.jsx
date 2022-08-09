import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { Avatar, Container, Button, Typography, Grid, Paper } from '@material-ui/core'
import { GoogleLogin } from '@react-oauth/google'
import Input from './Input.jsx'
import Icon from './Icon.jsx'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import jwt_decode from 'jwt-decode'
import { signin, signup } from '../../actions/auth'

const SignInButton = styled.button`
  margin: 15px 0;
  background-color: #D76673;
  color: white;
  border: none;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    transform: scale(1.02);
  }
`

const Wrapper = styled.div`
  & #container {
    display: none;
  }
`

const initialState= {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

function Auth() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData , setFormData] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const switchMode = () => {
    setFormData(initialState)
    setIsSignup((prevSignup) => !prevSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const decoded = jwt_decode(res.credential)
    try {
      dispatch({ type: 'AUTH', data: { result: decoded, token: res.credential }})
      navigate('/posts')
    } catch(err) {
      console.log(err)
    }
  }

  const googleFailure = () => {
    console.log('Google signin was unsuccessful.')
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>}
          </Grid>
          <SignInButton type='submit'>
            {isSignup ? 'SIGN UP' : 'SIGN IN'}
          </SignInButton>
          <Wrapper>
          <GoogleLogin
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          </Wrapper>
        <div style={{display:'flex', justifyContent:'flex-end', marginTop: '10px'}}>
          <Button style={{fontSize: '10px'}} onClick={switchMode}>
            {isSignup ? 'Already have an Account? Sign In' : `Don't have an Account? sign up`}
          </Button>
        </div>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth