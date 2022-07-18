import * as api from '../api'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData)
    dispatch({type: 'AUTH', data})
    navigate('/posts')
  } catch(err) {
    alert(`Your login credentials don't match an account in our system.`)
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData)
    dispatch({type: 'AUTH', data})
    navigate('/posts')
  } catch(err) {
    console.log(err)
  }
}