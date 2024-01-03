import React from 'react'
import Layouts from '../components/Layout/Layouts'
import {BiMailSend,BiPhoneCall,BiSupport} from "react-icons/bi";

const Contact = () => {
  return (
    <Layouts title={"Contact - Ecommerse"}>
      <div className="row contactus">
        <div className="col-md-6">
        <img src="/images/contactus.jpg" alt="contactus" style={{width:"100%"}} />
        </div>
      <div className="col-md-4">
        <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
        <p className='text-justify mt-3'>Any information and Query feel free to call anytime we 24x7 available </p>
        <p className="mt-3">
          <BiMailSend/>: www.helpecommerse.com
        </p>
        <p className="mt-3">
          <BiPhoneCall/> : 012-345-6789
        </p>
        <p className="mt-3">
          <BiSupport/> : 1800-0000-0012 (toll free)
        </p>
      </div>
      </div>
    </Layouts>
  )
}

export default Contact