import React, { useState } from 'react'
import Layouts from '../../components/Layout/Layouts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    // navigate hook 
    const navigate = useNavigate();
    // submit form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };
    console.log(process.env.REACT_APP_API);
    return (
        <Layouts title={"Register - Ecommerse"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <u>
                        <h4>REGISTER FORM</h4>
                    </u>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" placeholder='Enter Your Name' required />
                    </div>

                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                    </div>

                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>

                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone1" placeholder='Enter Your Phone number' required />
                    </div>


                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress1" placeholder='Enter Your Address' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer1" placeholder='Your best friend name' required />
                    </div>
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary p-2 text-white text-center">REGISTER</button>
                    </div>
                </form>

            </div>
        </Layouts>
    )
}

export default Register