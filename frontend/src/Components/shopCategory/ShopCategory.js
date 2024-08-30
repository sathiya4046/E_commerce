import React, { useContext } from 'react'
import dropdown from '../../assets/Frontend_Assets/dropdown_icon.png'
import './shopcategory.css'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const ShopCategory = ({banner,category}) => {

    const {all_product} = useContext(ShopContext)
  return (
    <div>
        <img src={banner} alt="bannerimage" className='w-100' />
        <div className='d-flex justify-content-between'>
            <p className='m-3'><strong>Showing 1-12</strong> out of 36 products</p>
            <div className='m-3'>Sort by <img src={dropdown} alt="" /> </div>
        </div>
        <div id='product' className='d-md-flex flex-wrap justify-content-md-around text-center p-3'>
            {all_product.map((item,i)=>{
                if(category===item.category){
                    return <div key={i}>
                    <Link to={`/product/${item.id}`}>
                        <img className='mx-md-2' src={item.image} alt="Collections_of_images" height={300} width={250}/>
                        <p className='my-2'>{item.name}</p>
                    </Link>
                    <div className='my-3'>Price: <span>{`$${item.new_price}`}</span> <span className='mx-2 oldprice'>{`$${item.old_price}`}</span></div>
                </div>
                }else{
                    return null
                }
            })}
        </div>
    </div>
  )
}

export default ShopCategory