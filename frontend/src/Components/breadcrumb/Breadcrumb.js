import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({category,name}) => {
  return (
    <div>
        <nav className='m-3'>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/${category}s`}>Shop</Link></li>
            <li className="breadcrumb-item"><Link to={`/${category}s`}>{category}</Link></li>
            <li className="breadcrumb-item">{name}</li>
        </ol>
        </nav>
    </div>
  )
}

export default Breadcrumb