import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='fs-3 d-flex justify-content-evenly d-md-flex flex-md-column align-items-md-around justify-content-md-center m-md-4 '>
      <Link className='text-decoration-none p-3 mb-md-4 btn btn-outline-info fs-5' to={'/'}> Add Product</Link>
      <Link className='text-decoration-none p-3 btn btn-outline-info fs-5' to={'/productlist'}> Products list</Link>
    </div>
  )
}

export default Sidebar