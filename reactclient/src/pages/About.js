import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { BiPhoneCall, BiSupport, BiMailSend, BiCart } from 'react-icons/bi';

const About = () => {
  return (
    <Layouts title={"About - Ecommerse"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/aboutus.jpg" alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className='bg-dark p-2 text-white text-center'>ABOUT US</h1>
          <p className='text-justify mt-3'><BiCart /> : E-commerce (electronic commerce) is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These business transactions occur either as business-to-business (B2B), business-to-consumer (B2C), consumer-to-consumer or consumer-to-business.
          </p>
          <p className="mt-3">
            <BiMailSend />: www.helpecommerse.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-345-6789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0012 (toll free)
          </p>
        </div>
      </div>
    </Layouts>
  )
}

export default About