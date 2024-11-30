import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom' 


const Signup = () => {
    const [state,setState] = useState("Login")
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })
    const signUp = async (e) =>{
        e.preventDefault()
        try{
        const res = await axios.post('http://localhost:4000/register', user)
            if(res.data.Status==='Success'){
            localStorage.setItem("token",res.data.token)
            window.location.replace('/')
            console.log(res)
            }
        }catch(error){
            return console.log(error)
        }
    }

    const login = async (e) =>{
        e.preventDefault()
        try{
        await axios.post('http://localhost:4000/login', user)
        .then(res=>{
            if(res.data.Status==='Success'){
            localStorage.setItem("token",res.data.token)
            window.location.replace('/')
            console.log(res)
            }else{
            alert(res.data.Error)
            }
        })
        .then(err=>console.log(err))
        }catch(error){
        return console.log(error)
        }
    }
  return (
    <div>
        <form 
            className="d-flex justify-content-center mx-auto flex-column text-center g-3" 
            style={{height:"60vh",width:"400px"}}
            onSubmit={(e)=>{state === "Sign-up" ? signUp(e) : login(e) }}
        >
        <h3>{state}</h3>
            {state==="Sign-up" ? <input 
                className='my-2 p-2 rounded' 
                type="text" 
                placeholder='Name'
                name='name'
                onChange={(e)=>setUser({...user,name:e.target.value})}
            /> : <></> }
            <input 
                className='my-2 p-2 rounded' 
                type="email" 
                placeholder='Email' 
                id="inputEmail4"
                name='email'
                onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            <input 
                className='my-2 p-2 rounded' 
                type="password" 
                placeholder="Password" 
                id="inputPassword4"
                name='password'
                onChange={(e)=>setUser({...user,password:e.target.value})}
            />
            <div className='d-flex'>
                <input type="checkbox" id="gridCheck" required/>
                <label className='ms-3' htmlFor="gridCheck">
                    Check me out
                </label>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Continue</button>
            </div>
            <div className='text-start my-2 py-2'>
                { state === "Sign-up" ? 
                    <p>If you have account click here <Link onClick={()=>setState("Login")} className='text-primary'> Login</Link></p> 
                    :<p>Don't have account click here <Link onClick={()=>setState("Sign-up")} className='text-primary'>Signup</Link></p> }
            </div>
        </form>
    </div>
  )
}

export default Signup