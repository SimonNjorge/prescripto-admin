import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [appointments, setAppointments] = useState([]);
    const [dashBData, setDashBData] = useState(false);
    const [profileData, setProfileData] = useState(false);
    const [docAtoken, setDocAtoken] = useState(localStorage.getItem('docAtoken') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMyAppointments = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/get-myAppointments', {},
                {headers: {'Authorization' : `Bearer ${docAtoken}`}}
            );
            if(data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const  getDashboardData = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/dashboard', {},
                {headers: {'Authorization': `Bearer ${docAtoken}`}}
            );

            if (data.success) {
                setDashBData(data.dashBData)
                console.log(data.dashBData);  
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/profile', {},
                {headers: {'Authorization': `Bearer ${docAtoken}`}}
            );

            if (data.success) {
                setProfileData(data.docData)
                console.log(data.docData); 
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId},
                {headers: {'Authorization' : `Bearer ${docAtoken}`}}
            );
            if (data.success) {
                toast.success(data.message);
                getMyAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId},
                {headers: {'Authorization' : `Bearer ${docAtoken}`}}
            );
            if (data.success) {
                toast.success(data.message);
                getMyAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        docAtoken, setDocAtoken,
        appointments, getMyAppointments,
        cancelAppointment, completeAppointment,
        getDashboardData, dashBData,
        getProfileData, setProfileData, profileData,
        backendUrl
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export { DoctorContextProvider, DoctorContext}