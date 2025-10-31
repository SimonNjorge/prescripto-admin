import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

  const { dashBData, getDashBoardData, adminAtoken, cancelAppointment } = useContext(AdminContext);
  const { formatSlotDate } = useContext(AppContext);

  useEffect(()=>{
    if(adminAtoken){
      getDashBoardData();
    }
  }, [adminAtoken])

  return dashBData && (
    <div className='m-5 max-sm:mx-0.5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-lg text-gray-600 font-semibold'>{dashBData.doctors}</p>
            <p className='text-sm text-gray-500'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-lg text-gray-600 font-semibold'>{dashBData.appointments}</p>
            <p className='text-sm text-gray-500'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-lg text-gray-600 font-semibold'>{dashBData.patients}</p>
            <p className='text-sm text-gray-500'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 p-4 mt-10 border border-gray-400 rounded-t'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>

        <div className='pt-4 border border-gray-400 border-t-0'>
          {dashBData.latestAppointments.map((appntmnt, i) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200 cursor-pointer' key={i}>
              <img className='w-10 h-10 rounded-full' src={appntmnt.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-semibold'>{appntmnt.docData.name}</p>
                <p className='text-gray-600'>{formatSlotDate(appntmnt.slotDate)}</p>
              </div>
             {
                appntmnt.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : appntmnt.isCompleted
                  ? <p className="text-green-500 text-xs font-medium">Completed</p> 
                  : <img onClick={()=>cancelAppointment(appntmnt._id)} className='w-10' src={assets.cancel_icon}/>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard