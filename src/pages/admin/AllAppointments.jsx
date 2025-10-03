import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import {assets} from "../../assets/assets"

const AllAppointments = () => {

  const { adminAtoken, appointments, setAppointments, getAllAppointments, cancelAppointment} = useContext(AdminContext);
  const { calculateAge, formatSlotDate, currencySymbol } = useContext(AppContext);

  useEffect(()=>{
    if(adminAtoken){
      getAllAppointments();
    }
  }, [adminAtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">
        All Appointments
      </p>
      <div className="bg-white max-h-[80vh] min-h-[60vh] border border-gray-200 rounded text-sm overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((appntmnt, i) =>(
          <div key={i} 
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer'>
            <p className='max-sm:hidden'>{i + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={appntmnt.userData.image} className='w-8 rounded-full' />
              <p>{appntmnt.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(appntmnt.userData.dob)}</p>
            <p>{formatSlotDate(appntmnt.slotDate)}, {appntmnt.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={appntmnt.docData.image} className='w-8 rounded-full bg-gray-200' />
              <p>{appntmnt.docData.name}</p>
            </div>
            <p>{currencySymbol}{appntmnt.docData.fees}</p>
            {
              appntmnt.cancelled 
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : <img onClick={()=>cancelAppointment(appntmnt._id)} className='w-10' src={assets.cancel_icon}/>
            }
          </div>
        ))}

      </div>

    </div>
  )
}

export default AllAppointments