import './App.css';
import LoginForm from './components/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentDetails from './components/StudentDetails';
import { Routes, Route } from 'react-router-dom';
import TryToUpload from './components/TryToUpload';
import TryToDelete from './components/TryToDelete';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className='App'>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<><LoginForm/></>}/>
        <Route path='/dashboard' element={<><StudentDetails/></>}/>
        <Route path='/signup' element={<><SignUp/></>}/>
      </Routes>
    </div>
  );
}

export default App;


// <TryToUpload />
//       <TryToDelete />