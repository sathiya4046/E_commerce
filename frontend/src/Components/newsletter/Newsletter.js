import React from 'react'
import './newsletter.css'

const Newsletter = () => {
  return (
    <div className='container'>
        <div className='mx-auto d-flex flex-column text-center' id='newsletter'>
        <h1 className='mt-5 p-2'>Get Exclusive offers on your email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input 
                type="email" 
                placeholder='Your email id'
                className='rounded-pill w-50 p-2'
            />
            <button style={{backgroundColor:"lightgreen"}} className='p-2 ms-2 rounded-pill'>Subscribe</button>
        </div>
    </div>
    </div>
  )
}

export default Newsletter