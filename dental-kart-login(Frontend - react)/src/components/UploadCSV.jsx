import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const UploadCSV = () => {

    const[formData, setFormData] = useState({})
    const[file, setFile] = useState(null)

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formDataWithFile = new FormData()
        formDataWithFile.append('file', file)
        for(const[key, value] of Object.entries(formData)){
            formDataWithFile.append(key, value)
        }
        axiosInstance.post('/submit-form', formData)
        .then(response => {
            console.log('Success', response.data)
        })
        .catch(error => {
            console.error('Error: ', error)
        })
    }

    const handleInputChange = (e) => {
        const target = e.target
        const value = target.value
        const name =  target.name
        setFormData({...formData, [name]: value})
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

  return (
    <>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <label>
                Name:
                <input type="text" name="name" onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" onChange={handleInputChange} />
            </label>
            <br />
            <label>
            CSV File:
            <input type="file" name="file" accept="csv" onChange={handleFileChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default UploadCSV