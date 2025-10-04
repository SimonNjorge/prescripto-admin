import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const {adminAtoken, setAdminAtoken} = useContext(AdminContext);
    const {docAtoken, setDocAtoken} = useContext(DoctorContext);
    
    const navigate = useNavigate();

    const logout = () => {
        adminAtoken && setAdminAtoken('');
        adminAtoken && localStorage.removeItem('accessToken');
        docAtoken && setDocAtoken('');
        docAtoken && localStorage.removeItem('docAtoken');
        navigate('/');
    }

  return (
    <div className='flex justify-between px-4 py-3 sm:px-10 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='px-2.5 py-0.5 border border-gray-500 rounded-full text-gray-600'>
                {adminAtoken ? "Admin" : "Doctor"}
            </p>
        </div>
        <button onClick={logout} className='py-2 px-10 bg-primary text-white text-sm rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar;