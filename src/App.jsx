import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import DoctorsList from './pages/admin/DoctorsList';
import AllAppointments from './pages/admin/AllAppointments';
import Dashboard from './pages/admin/Dashboard';
import AddDoctor from './pages/admin/AddDoctor';

const App = () => {

  const {adminAtoken} = useContext(AdminContext);

  return adminAtoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/doctors-list' element={<DoctorsList/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
  ) :(
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App