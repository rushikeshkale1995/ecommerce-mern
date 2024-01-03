import React, { useState } from 'react'
import Layouts from '../../components/Layout/Layouts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    // navigate hook 
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    console.log(process.env.REACT_APP_API);
    return (
        <Layouts title={"Login- Ecommerse"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <u>
                        <h4>LOGIN FORM</h4>
                    </u>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                    </div>

                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>

                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary p-2 text-white text-center">LOGIN</button>
                    </div><br />
                    <div>
                        <button type="button" className="btn btn-sm btn-danger p-2 text-white text-center" onClick={() => { navigate('/forgotpassword') }}>Forgot-password?</button>
                    </div>
                </form>

            </div>
        </Layouts>
    )
}

export default Login