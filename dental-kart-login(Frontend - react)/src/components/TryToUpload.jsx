import React, { useState } from 'react';
import axios from 'axios';

function TryToUpload() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append('file', file);
    for (const [key, value] of Object.entries(formData)) {
      formDataWithFile.append(key, value);
    }
    axios.post('http://localhost:5000/submit-form', formDataWithFile)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        <input className='btn btn-dark m-2' type="file" name="file" onChange={handleFileChange} />
      </label>
      <button className='btn btn-success' type="submit">Import CV</button>
    </form>
  );
}

export default TryToUpload;
