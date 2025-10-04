import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob)
        const age = today.getFullYear() - birthDate.getFullYear();
        return age
    }

    const currencySymbol = '$'; 

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatSlotDate = (slotDate) => {
        let dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])] + ' ' + dateArray[2]
    }
    
    const value = {
        calculateAge,
        formatSlotDate,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContextProvider, AppContext };

