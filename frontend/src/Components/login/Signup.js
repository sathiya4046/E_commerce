import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
        <form class="d-flex justify-content-center mx-auto flex-column text-center g-3" style={{height:"60vh",width:"400px"}}>
            <input className='my-2 p-2 rounded' type="text" placeholder='Name'/>
            <input className='my-2 p-2 rounded' type="email" placeholder='Email' id="inputEmail4"/>
            <input className='my-2 p-2 rounded' type="password" placeholder="Password" id="inputPassword4"/>
            <div className='d-flex'>
                <input type="checkbox" id="gridCheck"/>
                <label className='ms-3' for="gridCheck">
                    Check me out
                </label>
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Sign up</button>
            </div>
            <div className='text-start my-2 py-2'><p>If you have account click here <Link to={'/login'}>Login</Link></p></div>
        </form>
    </div>
  )
}

export default Signup