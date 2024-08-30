import React from 'react'
import './main.css'
import main from '../../assets/Frontend_Assets/hero_image.png'
import hand from '../../assets/Frontend_Assets/hand_icon.png'
import { FaHandPointRight } from "react-icons/fa";


const Main = () => {
  return (
    <div className='container-fluid' >
        <div className='row p-5 d-flex justify-content-evenly' id='main'>
            <div className='col-md-6 my-auto p-4 d-flex flex-column align-items-start'>
                <p className='mt-5'><i>NEW ARRIVALS ONLY</i></p>
                <h1 id='heading' className='py-1'>new <img src={hand} alt="handimage" width={70} height={70}  /> <br /> collection <br /> for everyone</h1>
                <button style={{backgroundColor:"orangered"}} className='fs-4 my-3 p-3 btn btn-secondary rounded-pill'>Latest Collection <FaHandPointRight className='fs-2'/>
                </button>
            </div>
            <div className='col-md-4 d-none d-md-flex'>
                <img src={main} alt="girlbackground" width={500} height={600} />
            </div>
        </div>
    </div>
  )
}

export default Main