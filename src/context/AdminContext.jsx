import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [adminAtoken, setAdminAtoken] = useState(localStorage.getItem('accessToken') || '');
    const [doctors, setDoctors] = useState([]);

    //to access an environment variable in vite
    //use import.meta.env.variablename
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', {}, {
                headers:{
                    'Authorization': `Bearer ${adminAtoken}`
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

    const value = {adminAtoken, setAdminAtoken, backendUrl, doctors, getAllDoctors, toggleAvailabilty} 

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;

