import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [appointments, setAppointments] = useState([]);
    const [docAtoken, setDocAtoken] = useState(localStorage.getItem('docAtoken') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMyAppointments = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/doctor/get-myAppointments', {},
                {headers: {'Authorization' : `Bearer ${docAtoken}`}}
            );
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments)
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
        backendUrl
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export { DoctorContextProvider, DoctorContext}