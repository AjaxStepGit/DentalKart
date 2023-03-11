import React, { useState } from 'react'
import './css/SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {

    const [first_name, setFName] = useState('')
    const [last_name, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            console.log(first_name, last_name)
        const response = await axios.post('http://localhost:5000/api/users', { first_name, last_name, password, email }, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        console.log(data); // handle the authentication response here
        if(data.success == 1){
            toast("Yeah ! User Created !!")
        }
        navigate('/')
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
                        <h1>Sign Up</h1>
                        
                        <form onSubmit={handleSubmit}>
                            <input className='login-input' id='first_name' value={first_name} onChange={(event) => setFName(event.target.value)} type='text' placeholder='Enter First Name' name='first_name'/>
                            <input className='login-input' id='last_name' value={last_name} onChange={(event) => setLName(event.target.value)} type='text' placeholder='Enter Last Name' name='last_name'/>
                            <input className='login-input' id='email' value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='Enter email' name='email'/>
                            <input className='login-input' id='password' onChange={(event) => setPassword(event.target.value)} type='password' placeholder='Password' name='password'/>
                            <a href='/'>Have an account ? Login instead</a>
                        <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp