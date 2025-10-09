import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

  const { getProfileData, setProfileData, profileData, docAtoken, backendUrl } = useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [action, setAction] = useState(false);

  const updateProfile = async () => {
    if(!action){
      try {
        setAction(true)
        /*
        await new Promise((resolve, reject) => {
          setTimeout(()=>{
          reject({message: 'failed'})
        }, 12000)}).catch(console.log)*/

        const formData = new FormData();
        formData.append("address", JSON.stringify(profileData.address));
        formData.append("about", profileData.about)
        formData.append("experience", profileData.experience)
        formData.append("fees", profileData.fees)
        formData.append("available", profileData.available)
        image && formData.append("image", image)

        const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', formData,
          {headers: {'Authorization': `Bearer ${docAtoken}`}}
        )

        if (data.success) {
          toast.success(data.message)
          setIsEdit(false);
          getProfileData();
        } else {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      } finally {
        setAction(false)
      }
    }
  }

  useEffect(()=>{
    if (docAtoken) {
      getProfileData();
    }
  }, [docAtoken]);

  return profileData && (
    <div>

      <div className='flex flex-col max-sm:items-center gap-4 m-5 max-sm:mx-0'>
        {
          isEdit 
          ? <div className='bg-primary/60 max-w-[280px] max-h-[300px] overflow-hidden rounded-lg max-sm:max-w-48 relative'>
            {
              image 
              ? <>
                  <img className='bg-primary/90 w-full' src={URL.createObjectURL(image)}/>
                  <label className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2' htmlFor="doc_image">
                      <img className='cursor-pointer' src={ assets.add_icon} alt="" />
                  </label>
                  <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="doc_image" className='hidden'/>
                </>
              : <>
                  <img className='bg-primary/90 w-full' src={profileData.image} alt="" />
                  <label className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2' htmlFor="doc_image">
                    <img src={assets.add_icon} alt="" />
                  </label>
                  <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="doc_image" className='hidden'/>
                </>
            }
          </div>
          : <div className='bg-primary/90 max-w-[280px] rounded-lg max-sm:max-w-48'>
            <img className='w-full' src={profileData.image} alt="" />
          </div>
        }
        <div className='flex-1 border border-stone-100 p-8 py-7 rounded-lg bg-white max-sm:p-3'>

          {/*-- doc name, degree, speciality and experience --*/}
          <p className='flex items-center gap-2 text-3xl text-gray-700 font-medium'>{profileData.name}</p>
          <div className='flex sm:items-center gap-2 mt-1 text-gray-600 max-sm:flex-col'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            {
              isEdit 
              ? <input onChange={(e)=>setProfileData(prev => ({...prev, experience: e.target.value}))} value={profileData.experience} className='border border-gray-300 p-2' placeholder='Experience' type="text"  id="" />
              : <p className='py-0.5 px-2 w-16 border rounded-full text-xs'>{profileData.experience}</p>
            }
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            {
              isEdit
              ? <textarea onChange={(e)=>setProfileData(prev => ({...prev, about: e.target.value}))} value={profileData.about} className='p-4 border border-gray-400 max-w-[700px] h-[100px] w-full' name=""  id="" placeholder='Type here'></textarea>
              : <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
            }
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: {
              isEdit
              ? <input onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} type="number" name="" id="" className='border border-gray-400 max-sm:w-10' />
              : <span className='text-gray-800'>{currencySymbol}{profileData.fees}</span>
            } 
          </p>

          <div className='flex gap-2 py-2 max-sm:flex-col'>
            <p>Address:</p>
            {
              isEdit
              ? <>
                <input className='border border-gray-400' onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={profileData.address.line1} type="text" name="" id="" />
                <input className='border border-gray-400' onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={profileData.address.line2} type="text" name="" id="" />
              </>
              : <p className='text-sm'>
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            }
          </div>

          <div className='flex gap-1 pt-2'>
            {
              isEdit
              ? <>
                <input onChange={(e)=>setProfileData(prev => ({...prev, available: e.target.checked}))} checked={profileData.available}  type="checkbox" name="" id="availability" />
                <label htmlFor="availability">Available</label>
              </>
              : <div className='flex items-center gap-2'>
                {
                  profileData.available
                  ? <p className='h-2 w-2 rounded-full bg-green-500'></p>
                  : <p className='h-2 w-2 rounded-full bg-gray-500'></p>
                }
                <p className={`${profileData.available ? 'text-green-500' : 'text-black'} font-semibold`}>
                  {profileData.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            }
          </div>
          {
            isEdit
            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary rounded-full text-sm mt-5 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer'>
              {action
                ? <div className='flex items-center justify-center'>
                    <p className='w-3 h-3 border mr-1 animate-spin'></p>
                      saving...
                    </div>
                : 'Save information'
              }
            </button>
            : <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary rounded-full text-sm mt-5 cursor-pointer hover:bg-primary hover:text-white transition-all duration-500'>
              Edit
            </button>
          }
        </div>

      </div>

    </div>
  )
}

export default DoctorProfile