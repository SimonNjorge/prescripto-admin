import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [adminAtoken, setAdminAtoken] = useState(localStorage.getItem('accessToken') || '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashBData, setDashBData] =  useState(false);
    
    //to access an environment variable in vite
    //use import.meta.env.variablename
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors',
                {},
                {
                headers: {
                    'authorization': `Bearer ${adminAtoken}`
                }
            });
            if(data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleAvailabilty = async (docId) => {
        try {
        const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {
            headers: {
            'Authorization': `Bearer ${adminAtoken}`
            }
        })

        if(data.success){
            toast.success(data.message);
            getAllDoctors();
        } else {
            toast.error(data.message)
        }

        } catch (error) {
            //error happens on the client while 
            //sending the request
            toast.error(error.message)
        }
    }

    const  getAllAppointments =  async () => {

        try {
            
            const { data } = await axios.get(backendUrl + '/api/admin/get-appointments',
                {
                    headers: {
                        'Authorization' : `Bearer ${adminAtoken}`
                    }
                }
            )

            if (data.success) {
                setAppointments(data.appointments)
                console.log(appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const cancelAppointment = async (appointmentId) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',
                {appointmentId},
                {
                    headers: {
                        'Authorization': `Bearer ${adminAtoken}`
                    }
                }
            )

            if (data.success) {
                toast.success(data.message);
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashBoardData = async () => {
        try {
            
            const  { data } = await axios.get(backendUrl + '/api/admin/dashboard',
                {headers: {'Authorization' : `Bearer ${adminAtoken}`}}
            )

            if (data.success) {
                setDashBData(data.dashBData)
                console.log(data.dashBData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        adminAtoken, setAdminAtoken,
        backendUrl, 
        doctors, getAllDoctors, toggleAvailabilty,
        appointments, setAppointments, getAllAppointments, cancelAppointment, 
        dashBData, getDashBoardData
    } 

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export { AdminContextProvider, AdminContext };

