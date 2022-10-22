import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { Link, Navigate } from 'react-router-dom'
import { isUserLoggedIn, login } from '../../actions/auth.actions'
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(!auth.authenticate){

      dispatch(isUserLoggedIn())
    }
  },[])
  const submitForm=(e)=>{
    e.preventDefault()
    if(email ===''){
      setErrorEmail('Email must not be empty')
    }
    if(password ===''){
      setErrorPassword('Password must not be empty')
    }
    const data ={
      email:email,
      password:password 
    }

    dispatch(login(data))
  }
  if(auth.authenticate){
    return <Navigate to="/" />
  }
  const emailErrorTimoutId = setTimeout(()=>setErrorEmail(''),4000)
  const passwordErrorTimoutId = setTimeout(()=>setErrorPassword(''),4000)
  if(errorEmail ===''){
    clearTimeout(emailErrorTimoutId)
  }
  if(errorPassword ===''){
    clearTimeout(passwordErrorTimoutId)
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <form onSubmit={submitForm} className="pt-5">
            <legend>Sign In</legend>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
              style={{borderColor: errorEmail && 'red'}}
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              {errorEmail && (
                <p className="error"> {errorEmail} </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
              style={{borderColor: errorPassword && 'red'}}
                type="password"
                className="form-control"
                id="password"
                onChange={(e)=>setpassword(e.target.value)}
              />
               {errorPassword && (
                <p className="error"> {errorPassword} </p>
              )}
            </div>
            <div className=" mb-3">
              <span className="pe-2" htmlFor="">
                Don't have account?
              </span>
              <Link to="/signup" className="btn btn-primary">
                register
              </Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
