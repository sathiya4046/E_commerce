import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../../assets/Frontend_Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext)
  return (
    <div className='container'>
        <div className='my-5'>
            <table className="table">
                <thead>
                    <tr className='text-start'>
                        <th scope="col">Products</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {all_product.map((e,i)=>{
                    if(cartItems[e.id]>0){
                        return <tbody  key={i}>
                                    <tr className='text-start'>
                                        <td><img src={e.image} alt="cartimage" width={100} height={80} /></td>
                                        <td><p>{e.name}</p></td>
                                        <td><p>${e.new_price}</p></td>
                                        <td><button className='px-2'>{cartItems[e.id]}</button></td>
                                        <td><p>{e.new_price* cartItems[e.id]}</p></td>
                                        <td><img src={remove_icon} onClick={()=>removeFromCart(e.id)} alt="removeitem" /></td>
                                    </tr>
                                </tbody>
                    }
                    return null
                })}
                
            </table>
            <div className='row m-5'>
                <div className='col-md-5'>
                    <h3>Cart Total</h3>
                    <div className='d-flex justify-content-between'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Total</h5>
                        <h5>${getTotalCartAmount()}</h5>
                    </div>
                    <button className='btn btn-outline-danger my-4'>PROCCED TO CHECKOUT</button>
                </div>
                <div className='col-md-4'>
                    <p className='ms-md-5'>If you have a promo code, Enter here</p>
                    <input className=' mx-md-5 text-center p-2' type="text" placeholder='promo code' />
                    <button className='my-md-2 p-2 btn btn-outline-dark'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems