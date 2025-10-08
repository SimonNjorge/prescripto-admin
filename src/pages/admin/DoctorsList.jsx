import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

const DoctorsList = () => {

  const { adminAtoken, doctors, getAllDoctors, toggleAvailabilty } = useContext(AdminContext);

  useEffect(()=>{
    getAllDoctors()
  }, [adminAtoken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='font-semibold text-lg'>All Doctors</h1>
      <div className='flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((doc, i)=>(
            <div className='border border-indigo-200 rounded-xl max-w-[56]
             overflow-hidden cursor-pointer group' key={i}
            >
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-56' src={doc.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{doc.name}</p>
                <p className='text-zinc-600 text-sm'>{doc.speciality}</p>
                <div className='mt-4 flex items-center text-sm'>
                  <input onChange={()=>toggleAvailabilty(doc._id)} type='checkbox' checked={doc.available}/>
                  <p className='ml-1'>available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList