import React, { createContext, useState } from 'react'
import all_product from '../assets/Frontend_Assets/all_product'

export const ShopContext = createContext(null)

const getDefaultCart = ()=>{
    let cart = {}
    for (let i = 0; i < all_product.length+1; i++) {
        cart[i]=0   
    }
    return cart
    
}

const ShopContextProvider = ({children})=>{
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [add,setAdd] = useState(false)

    const addToCart = (itemId)=>{
        setTimeout(()=>{
            setAdd(true)
        },1000)
        setCartItems(e=>({...e,[itemId]:e[itemId]+1}))
        setAdd(false)
    }
    const removeFromCart = (itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }
    const getTotalCartItems = ()=>{
        let totalItem = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {add,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart}
    return(
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider