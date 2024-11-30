import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const ShopContext = createContext(null)

const getDefaultCart = ()=>{
    let cart = {}
    for (let i = 0; i < 300+1; i++) {
        cart[i]=0   
    }
    return cart
    
}

const ShopContextProvider = ({children})=>{
    const [all_product,setall_Product] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [add,setAdd] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('http://localhost:4000/allproducts')
            setall_Product(response.data.products)

            if(localStorage.getItem('token')){
                const res = await axios.get('http://localhost:4000/getcart',{
                    headers:{
                        "Authorization":`${localStorage.getItem('token')}`
                    }})
                    setCartItems(res.data)
            }
        }
        fetchData()
    },[])

    const addToCart = async (itemId)=>{
        setTimeout(()=>{
            setAdd(true)
        },1000)
        setCartItems(e=>({...e,[itemId]:e[itemId]+1}))
        setAdd(false)
        if(localStorage.getItem('token')){
            const response =await axios.post('http://localhost:4000/addtocart',{"itemId":itemId},{
                headers:{
                    "Authorization":`${localStorage.getItem('token')}`
                }
            })
            console.log(response)
        }
    }
    const removeFromCart = async (itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('token')){
            const response =await axios.post('http://localhost:4000/removefromcart',{"itemId":itemId},{
                headers:{
                    "Authorization":`${localStorage.getItem('token')}`
                }
            })
            console.log(response)
        }
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