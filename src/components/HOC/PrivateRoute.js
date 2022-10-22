import React from 'react'
import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({children:Component, ...rest})=>{
//     return <Route {...rest} render={(props)=>{
//         const token = window.localStorage.getItem('token')
//         if(token){
//             return <Component />
//         }else{
//             return <Navigate to="/signin" />
//         }
//     }}/>
// }

// const PrivateRoute =({childred})=>{
//     const token = window.localStorage.getItem('token')
//     console.log(token)
//     if(!token){
//         return <Navigate to="/signin" />
//     }
//     return childred
// }

const PrivateRoute = ({ children, redirectTo }) => {
  const token = window.localStorage.getItem('token')
  return token ? children : <Navigate to={redirectTo} />
}
export default PrivateRoute
