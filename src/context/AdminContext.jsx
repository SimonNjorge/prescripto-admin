import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [adminAtoken, setAdminAtoken] = useState(localStorage.getItem('accessToken') || '');

    //to access an environment variable in vite
    //use import.meta.env.variablename
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {adminAtoken, setAdminAtoken, backendUrl} 

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;

