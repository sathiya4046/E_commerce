import React from 'react'
import { FaInstagram, FaPinterest, FaShopify, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='container'>
        <div className='d-flex flex-column text-center'>
        <div className='m-4'>
            <FaShopify className='fs-1 mx-3 mb-2 '/>
            <Link className="navbar-brand ms-1 fs-3" to={'/'}>SHOP-MART</Link>
        </div>
        <ul className='list-unstyled d-flex mx-auto'>
            <li className='px-md-2'>Company</li>
            <li className='px-2'>Products</li>
            <li className='px-2'>About</li>
            <li className='px-md-2'>Contact</li>
        </ul>
        <div className='d-flex mx-auto'>
            <FaInstagram className='mx-3 fs-4'/>
            <FaPinterest className='mx-3 fs-4'/>
            <FaWhatsapp className='mx-3 fs-4'/>
        </div>
        <hr className='w-100 bg-info' />
        <p>Copyrights &copy; {new Date().getFullYear()} - All Rights Reserved</p>
    </div>
    </div>
  )
}

export default Footer