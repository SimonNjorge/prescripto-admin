import React, { useState } from 'react'
//import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState(false);

    const {setAdminAtoken, backendUrl} = useContext(AdminContext);
    const {setDocAtoken} = useContext(DoctorContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!action) {
            try {
                setAction(true)
                /*
                await new Promise((resolve, reject) => {
                setTimeout(()=>{
                reject({message: 'failed'})
                }, 12000)}).catch(console.log)*/

                if(state == 'Admin') {
                    const {data} = await axios.post(backendUrl + '/api/admin/login',{email, password});
                    if(data.success) {
                        //save the access token in localstorage
                        localStorage.setItem('accessToken', data.accessToken)
                        setAdminAtoken(data.accessToken);
                    } else {
                        toast.error(data.message)
                    }
                } else {
                    const { data } = await axios.post(backendUrl + '/api/doctor/login',
                        {email, password},
                    );

                    if(data.success) {
                        //save the access token in localstorage
                        localStorage.setItem('docAtoken', data.accessToken)
                        setDocAtoken(data.accessToken);
                    } else {
                        toast.error(data.message)
                    }
                }   

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            } finally {
                setAction(false)
            }
        }
    }


  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[250px] sm:min-w-[96] border rounded-xl text-gray-500 shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] p-2 mt-1 rounded w-full'  type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] p-2 mt-1 rounded w-full' type="password" required />
            </div>
            <button type='submit' className='bg-primary text-white py-2 w-full rounded-md text-base cursor-pointer'>
                {action
                ? <div className='flex items-center justify-center'>
                    <p className='w-3 h-3 border mr-1 animate-spin'></p>
                    Logging in...
                  </div>
                : 'Login'
                }
            </button>
            {
                state == 'Admin' 
                ?<p>
                    Doctor login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>click here</span>
                </p>
                :<p >Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>click here</span></p>
            } 
        </div>
    </form>
  )
}

export default Login