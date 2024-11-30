import React from 'react'
import logo from './assets/Admin_Assets/nav-logo.svg'
import profile from './assets/Admin_Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <nav className='d-flex justify-content-between align-items-center m-2 py-2'>
        <img src={logo} alt="Adminlogo" />
        <img src={profile} alt="adminprofile" />
    </nav>
  )
}

export default Navbar