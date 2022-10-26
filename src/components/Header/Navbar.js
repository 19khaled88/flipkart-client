import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../../actions/auth.actions'
import Search from './search'

const Navbar = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(isUserLoggedIn())
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/home')
  }
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg bg-light"
      style={{ zIndex: 1 }}
    >
      <div className="container-fluid">
        <Link className="text-decoration-none" to="/">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth.authenticate ? 'Logout' : 'Login/Register'}
              </a>
              <ul className="dropdown-menu">
                {auth.authenticate ? (
                  <li>
                    <span className="dropdown-item" onClick={logoutHandler}>
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/signin">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Register
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    User
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
