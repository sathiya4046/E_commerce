import React, { useContext } from 'react'
import icon from '../../assets/Frontend_Assets/star_icon.png'
import icond from '../../assets/Frontend_Assets/star_dull_icon.png'
import './productDisplay.css'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = ({id,image,name,oldPrice,newPrice}) => {
    const {addToCart,add} = useContext(ShopContext)
    const token = localStorage.getItem('token')
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <img className='m-5 ps-3' src={image} alt="productimage" />
            </div>
            <div className='col'>
                <h1 className='mt-md-5'>{name}</h1>
                <div className='my-3'>
                    <img src={icon} alt="staricon" />
                    <img src={icon} alt="staricon" />
                    <img src={icon} alt="staricon" />
                    <img src={icon} alt="staricon" />
                    <img src={icond} alt="staricon" />
                </div>
                <div className='my-3'>
                    <span><strong >Price: </strong> ${newPrice} </span>
                    <span className='mx-2' style={{textDecoration:"line-through"}}>${oldPrice}</span>
                </div>
                <p>Featuring a bold all-over floral print, this tailored cotton shirt is sure to make an impression and keep you looking sharp even on your casual day out.</p>
                <h3>Select Size</h3>
                <div id='size' className='d-flex justify-content-around my-3'>
                    <p>S</p>
                    <p>M</p>
                    <p>L</p>
                    <p>XL</p>
                    <p>XXL</p>
                </div>
                <button onClick={()=>{token ? addToCart(id) : window.location.replace('/signup')}} className='btn btn-success rounded-pill'>{add? "Added"  :"Add to cart"}</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay