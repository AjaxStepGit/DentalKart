import axios from 'axios';
import { saveAs } from 'file-saver';

const TryToDelete = () => {

    const handleDownload = () => {
        axios({
          url: 'http://localhost:5000/download',
          method: 'GET',
          responseType: 'blob'
        })
          .then((response) => {
            console.log(response)
            const blob = new Blob([response.data], { type: 'text/csv' });
            saveAs(blob, 'data.csv');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    

  return (
    <div className="App">
        <button className='btn btn-success' onClick={handleDownload}>Download Data</button>
    </div>
  )
}

export default TryToDelete