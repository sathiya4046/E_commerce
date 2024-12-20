import React, { useEffect, useState } from 'react'
import './popular.css'
import axios from 'axios'
import {baseUrl} from '../../constant/url'

const Popular = () => {
  const [data_product,setData_product] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get(`${baseUrl}/popularinwomen`)
      setData_product(response.data)
    }
    fetchData()
  },[])
  return (
    <div id='popular' className='container-fluid'>
        <h1 className='text-center'>POPULAR IN WOMEN</h1>
        <hr />
        <div className='d-md-flex justify-content-md-around text-center'>
            {data_product.map(item=>(
               <div key={item.id}>
                <img className='mx-md-2' src={item.image} alt="Collections_of_images" height={300} width={250}/>
                <p className='my-2'>{item.name}</p>
                <div className='my-3'>Price: <span>{`$${item.new_price}`}</span> <span className='mx-2 oldprice'>{`$${item.old_price}`}</span></div>
               </div>
            ))}
        </div>
    </div>
  )
}

export default Popular