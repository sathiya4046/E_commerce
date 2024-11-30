import React from "react";
import Navbar from "./Components/navbar/Navbar";
import {Routes,Route} from 'react-router-dom'
import Home from "./Components/home/Home";
import menBanner from './assets/Frontend_Assets/banner_mens.png'
import womenBanner from './assets/Frontend_Assets/banner_women.png'
import kidBanner from './assets/Frontend_Assets/banner_kids.png'
import Signup from "./Components/login/Signup";
import Footer from "./Components/footer/Footer";
import ShopCategory from "./Components/shopCategory/ShopCategory";
import Product from "./Components/product/Product";
import CartItems from './Components/cart/CartItems';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route 
            path="/kids" 
            element={<ShopCategory 
              banner={kidBanner} 
              category="kid"/>}
        />
        <Route 
            path="/womens" 
            element={<ShopCategory 
              category="women"
              banner={womenBanner}/>}
        />
        <Route 
            path="/mens" 
            element={<ShopCategory 
              category="men"
              banner={menBanner}/>}
        />
        <Route path="/product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<CartItems/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
