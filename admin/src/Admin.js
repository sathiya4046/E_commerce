import React from 'react'
import { Route, Routes } from "react-router-dom";
import Addproduct from "./Addproduct";
import Productlist from "./Productlist";
import Sidebar from "./Sidebar";

const Admin = () => {
  return (
    <div className='row'>
        <div className='col-md-3'>
        <Sidebar/>
        </div>
        <div className='col-md-7'>
        <Routes>
            <Route path="/" element={<Addproduct/>}/>
            <Route path="/productlist" element = {<Productlist/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default Admin