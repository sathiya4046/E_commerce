import React, { useState } from 'react'
import axios from'axios'
import upload_area from './assets/Admin_Assets/upload_area.svg'

const Addproduct = () => {
  const [image,setImage] = useState(false)
  const [product,setProduct] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })


  const handleSubmit =async (e) =>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('product',image)
    const response = await axios.post('http://localhost:4000/upload',formdata)
    console.log(response)
    if(response.data.success){
      product.image = response.data.image_url
      console.log(product)
      const res = await axios.post('http://localhost:4000/addproduct',product)
      res.data.success ? alert("Product added") : alert("Failed")
    }
  }


  return (
    <div>
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <div className='m-2 d-flex flex-column'>
          <label htmlFor="" className='my-2 ms-2 fs-5'>Product title</label>
          <input 
            className='p-2 ps-3 rounded-pill border' 
            type="text" 
            name='name' 
            placeholder='Title'
            value={product.name}
            onChange={e=>setProduct({...product,name:e.target.value})}
          />
        </div>
        <div className='d-flex'>
          <div className=' m-2 w-50 d-flex flex-column'>
            <label htmlFor="" className='my-2 ms-2 fs-5'>Price</label>
            <input 
              className='p-2 ps-3 rounded-pill border' type="text" 
              name='old_price' 
              placeholder='Enter here'
              value={product.old_price}
              onChange={e=>setProduct({...product,old_price:e.target.value})}
            />
          </div>
          <div className='m-2 w-50 d-flex flex-column'>
            <label htmlFor="" className='my-2 ms-2 fs-5'>Offer Price</label>
            <input 
              className='p-2 ps-3 rounded-pill border' type="text" 
              name='new_price' 
              placeholder='Enter here'
              value={product.new_price}
              onChange={e=>setProduct({...product,new_price:e.target.value})}
            />
          </div>
        </div>
        <div className=' m-2 d-flex flex-column'>
          <label htmlFor="" className='my-2 ms-2 fs-5'>Product Category</label>
          <select 
            className='p-2 ps-3 rounded-pill border' 
            name="category"
            value={product.category}
            onChange={e=>setProduct({...product,category:e.target.value})}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className=' m-2 d-flex flex-column '>
          <label htmlFor="input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="thumbnail_img" width={100} height={100}/>
          </label>
          <input 
            onChange={(e)=>setImage(e.target.files[0])} 
            type="file" 
            name='image' 
            id='input' 
            className='m-2' 
            hidden
          />
        </div>
        <div className=' m-2'>
          <button className='w-100 btn btn-success rounded-pill'>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default Addproduct