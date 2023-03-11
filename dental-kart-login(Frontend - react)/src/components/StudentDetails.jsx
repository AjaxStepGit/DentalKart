import React, { useEffect, useState } from 'react'
import './css/StudentDetails.css'
import axios from 'axios'
import TryToDelete from './TryToDelete'
import TryToUpload from './TryToUpload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




const StudentDetails = () => {
    const [data, setData] = useState([])

    const loadData = async() => {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
            if (!token) {
            // Token is not available, handle the error here
            toast("Sorry without token data could not get loaded!!")
            console.error('Token not available');
            return;
        }
        const response = await axios.get('http://localhost:5000/getall')
        setData(response.data)
    }

    useEffect(() => {
        loadData()
    }, [])

  return (
    <>
        <div className='bg'>
            <div className='text-box'>
                <h1 className='heading-primary'>
                    <span className='heading-primary-main'>DentalKart</span>
                    <span className='heading-primary-sub'>Submitted to Aditya Rai</span>
                </h1>
            </div>
        </div>
        <div class="content-x">
            <div class="div1"><TryToDelete /></div>
            <div class="div2"><TryToUpload /></div>
        </div>
        <div className='content'>
            <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Address</th>
                            <th>Institute</th>
                            <th>Course</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((element, index) => {
                        return(
                            <tr key={element.id}>
                                <th scope='row'>{index+1}</th>
                                <th>{element.Name}</th>
                                <th>{element.Roll_No}</th>
                                <th>{element.Address}</th>
                                <th>{element.Institute}</th>
                                <th>{element.Course}</th>
                                <th>{element.Email}</th>
                            </tr>
                        )
                    })}  
                    </tbody>
            </table>
        </div>
    </>
  )
}

export default StudentDetails