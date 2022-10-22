import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import '../../css/signup.css'
import { register } from '../../actions/auth.actions'
const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [cPassword, setcPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state=>state.user)
  
  const submitForm=(e)=>{
    e.preventDefault()
    if(password !==cPassword){
      setErrorMessage('Password not match!')
    }
    const data ={
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      confirm_password:cPassword
    }
   dispatch(register(data))
  }
  
   const timeoutId = setTimeout(()=>setErrorMessage(''),4000)
   
   if(errorMessage === ''){
    clearTimeout(timeoutId)
   }
   
   useEffect(()=>{
    if(user.success === true){
      navigate("/signin")
    }
   },[user])
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <form onSubmit={submitForm} className="pt-5">
            <legend>Sign Up</legend>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>First Name</label>
              <input type="text" className='form-control' id="fName" onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>Last Name</label>
              <input type="text" className='form-control' id="lName" onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
               style={{borderColor: errorMessage && 'red'}}
                type="password"
                className="form-control"
                id="confirmPassword"
                onChange={(e)=>setcPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="error"> {errorMessage} </p>
              )}
            </div>
            <div className=" mb-3">
              <span className="pe-2">
                Have account?
              </span>
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
