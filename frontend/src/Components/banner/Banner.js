import React from 'react'
import img from '../../assets/Frontend_Assets/exclusive_image.png'
import { FaHandPointRight } from 'react-icons/fa'
import './banner.css'

const Banner = () => {
  return (
    <div className='container my-4' >
        <div className='row d-flex justify-content-evenly' id='banner'>
            <div className='col-md-4 my-auto p-4 d-flex flex-column align-items-center'>
                <h1>Exclusive</h1>
                <h2>Offers for you</h2>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button className='fs-4 my-3 p-3 btn btn-success rounded-pill'>Check Now <FaHandPointRight className='fs-2'/>
                </button>
            </div>
            <div className='col-md-4 d-none d-md-flex my-auto'>
                <img src={img} alt="bannerimage" width={300} height={400} />
            </div>
        </div>
    </div>
  )
}

export default Banner