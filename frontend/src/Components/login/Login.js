import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div>
        <form class="d-flex justify-content-center mx-auto flex-column text-center g-3" style={{height:"60vh",width:"400px"}}>
            <input className='my-2 p-2 rounded' type="email" placeholder='Email' id="inputEmail4"/>
            <input className='my-2 p-2 rounded' type="password" placeholder="Password" id="inputPassword4"/>
            <div>
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div className='text-start my-2 py-2'><p>Don't have account click here <Link to={'/signup'}>Signup</Link></p></div>
        </form>
    </div>
  )
}

export default Login