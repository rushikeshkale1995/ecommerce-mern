import React, { useState } from 'react'
import Layouts from '../../components/Layout/Layouts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    // navigate hook 
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgotpassword`, { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    return (
        <Layouts title={'forgot password -ecommerse app'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <u>
                        <h4>Reset Password FORM</h4>
                    </u>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your friend name' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Set Your new Password' required />
                    </div>


                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary p-2 text-white text-center">Reset</button>
                    </div><br />

                </form>

            </div>
        </Layouts>
    )
}

export default ForgotPassword