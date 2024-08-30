import React from 'react'
import collections from '../../assets/Frontend_Assets/new_collections'

const NewCollection = () => {
  return (
    <div className='container-fluid'>
        <h1 className='text-center'>NEW COLLECTIONS</h1>
        <hr />
        <div className='d-md-flex flex-wrap justify-content-md-around text-center'>
            {collections.map(item=>(
               <div key={item.id}>
                <img className='mx-md-2' src={item.image} alt="Collections_of_images" height={300} width={250}/>
                <p className='fs-md-5 my-2'>{item.name}</p>
                <div className='my-3'>Price: <span>{`$${item.new_price}`}</span> <span className='mx-2 oldprice'>{`$${item.old_price}`}</span></div>
               </div>
            ))}
        </div>
    </div>
  )
}

export default NewCollection