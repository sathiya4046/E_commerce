import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cross_icon from './assets/Admin_Assets/cross_icon.png'
import { baseUrl } from './constant/url'

const Productlist = () => {
  const [all_product, setAll_product] = useState([])

  const fetchData =async () =>{
    const response = await axios.get(`${baseUrl}/allproducts`)
    setAll_product(response.data.products)
  }

  useEffect(()=>{
    fetchData()
  },[])

  const removeFromCart = async(id) =>{
    await axios.delete(`${baseUrl}/removeproduct/${id}`)
    await fetchData()
  }
  return (
    <div>
      <h2 className='text-center m-3'>All Products List</h2>
      <table className="table">
                <thead>
                    <tr className='text-start'>
                        <th scope="col">Products</th>
                        <th scope="col">Title</th>
                        <th scope="col">Old Price</th>
                        <th scope="col">New Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {all_product.map((e,i)=>{
                        return <tbody  key={i}>
                                    <tr className='text-start'>
                                        <td><img src={e.image} alt="cartimage" width={100} height={80} /></td>
                                        <td><p>{e.name}</p></td>
                                        <td><p>${e.old_price}</p></td>
                                        <td><p>{e.new_price}</p></td>
                                        <td><p>{e.category}</p></td>
                                        <td><img src={cross_icon} onClick={()=>removeFromCart(e.id)} alt="removeitem" /></td>
                                    </tr>
                                </tbody>
                    }
                )}
                
            </table>
    </div>
  )
}

export default Productlist