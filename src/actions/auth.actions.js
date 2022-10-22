import axiosBaseUrl from '../utility/url'
import { authConstants,userConstants } from './constants'

export const login = (user) => {
  
  return async (dispatch) => {
    dispatch({type:authConstants.LOGIN_REQUEST})

    const res = await axiosBaseUrl.post('/signin',{
       ...user
    })
    
    if(res.status === 200){
      const {token, userInfo:user} = res.data
      localStorage.setItem('token',token)
      localStorage.setItem('loggedInUserInfo',JSON.stringify(user))
      dispatch({
        type:authConstants.LOGIN_SUCCESS,
        payload:{
          token,user
        }
      })
    }
    if(res.status === 400){
      dispatch({
        type:authConstants.LOGIN_FAILURE,
        payload:{
          error:res.data.error
        }
      })
    }
  }


}

export const isUserLoggedIn=()=>{
  return async (dispatch) =>{
    const token = localStorage.getItem('token')
    if(token){
      const user = JSON.parse(localStorage.getItem('loggedInUserInfo'))
      dispatch({
        type:authConstants.LOGIN_SUCCESS,
        payload:{
          token,user
        }
      })
    }else{
      dispatch({
        type:authConstants.LOGIN_FAILURE,
        payload:{error:"User is not logged in"}
      })
    }
  }
}

export const logout=()=>{
  return async (dispatch)=>{
    localStorage.clear()
    dispatch({
      type:authConstants.LOGOUT_REQUEST
    })
  }
}
export const register=(user)=>{
  return async (dispatch)=>{
    dispatch({type:userConstants.USER_REGISTER_REQUEST})
    const response = await axiosBaseUrl.post('/signup',{
      ...user
    })
   
    if(response.status === 200){
      const {user} = response.data
      dispatch({
        type:userConstants.USER_REGISTER_SUCCESS,
        payload:{
          user,
          success:true
        }
      })
    }
    if(response.status === 400){
      dispatch({
        type:userConstants.USER_REGISTER_FAILURE,
        payload:{
          // error:response.error
          success:false
        }
      })
    }
  }
}
