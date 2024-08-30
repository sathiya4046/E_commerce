import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import ProductDisplay from '../productDisplay/ProductDisplay'

const Product = () => {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams()
    const product = all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
        <Breadcrumb category={product.category} name={product.name}/>
        <ProductDisplay 
        id={product.id}
        image={product.image}
        name={product.name}
        oldPrice={product.old_price}
        newPrice={product.new_price}
        />
    </div>
  )
}

export default Product