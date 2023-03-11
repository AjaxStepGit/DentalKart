import React, { useState } from 'react'
import './css/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password }, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        console.log(data); // handle the authentication response here
        if(data.success == 1){
            localStorage.setItem('token', data.token);  
            navigate('/dashboard')  
        }
        } catch (error) {
        console.error(error); // handle the error here
        }
    }
    

  return (
    <>
        <div className='container'>
            <div className='login-box'>
                <h1 className='heading-primary'>
                    <span className='heading-primary-main'>DentalKart</span>
                    <span className='heading-primary-sub'>Submitted to Aditya Rai</span>
                </h1>
                <div className='login'>
                    <div className='login-content'>
                        <h1>LOGIN</h1>
                        
                        <form onSubmit={handleSubmit}>
                            <input className='login-input' id='email' value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='Enter email' name='email'/>
                            <input className='login-input' id='password' onChange={(event) => setPassword(event.target.value)} type='password' placeholder='Password' name='password'/>
                            <a href='/signup'>Don't have an account ? Signup instead</a>
                        <button type='submit'>Submit</button>
                        </form>
                        <h2>OR</h2>
                        <button className='login-with'><span><img src='images/google.png'/></span>Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginForm