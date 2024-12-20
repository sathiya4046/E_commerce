import React, { useContext } from 'react'
import './navbar.css'
import { FaShopify} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { ShopContext } from '../../Context/ShopContext';
import Cookies from 'js-cookie'


const Navbar = () => {
  const {getTotalCartItems} = useContext(ShopContext)
  return (
      <div className='sticky-top'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <FaShopify className='fs-1 ms-4'/>
            <Link className="navbar-brand mx-md-4" to={'/'}>SHOP-MART</Link>
            <button className="navbar-toggler me-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link mx-3" to={'/'}>Shop</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to={'/kids'}>Kids</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to={'/womens'}>Womens</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to={'/mens'}>Mens</Link>
                </li>
              </ul>
              <Link to={'/signup'}>
                {
                  Cookies.get('token') ?
                  <button  
                    type="button" 
                    className="btn btn-outline-success rounded-pill mx-3"
                    onClick={()=>{Cookies.remove('token');window.location.replace('/')}}
                    >Logout</button>
                  :<button type="button" className="btn btn-outline-success rounded-pill mx-3">Login</button>
                }
              </Link>
              <Link to={'/cart'}><IoCartOutline className='fs-2 mx-4'/><span id='cart'>{getTotalCartItems()}</span></Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar