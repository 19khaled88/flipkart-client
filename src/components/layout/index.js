import React from 'react'
import Navbar from '../Header/Navbar'
const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}

export default Layout
