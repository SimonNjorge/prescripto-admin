import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {

  const {appointments, getMyAppointments, docAtoken, cancelAppointment, completeAppointment, currencySymbol } = useContext(DoctorContext);
  const {  calculateAge, formatSlotDate } = useContext(AppContext);

  useEffect(() => {
    if (docAtoken) {
      getMyAppointments();
    }
  }, [docAtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="text-lg font-medium mb-3">All Appointments</p>
      <div className="bg-white border border-gray-400 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b  border-gray-400">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>fees</p>
          <p>Actions</p>
        </div>
        {appointments.reverse().map((appntmnt, i) => (
          <div key={i} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-1 py-3 px-3 border-b border-gray-400 hover:bg-gray-100">
            <p className="max-sm:hidden">{i + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={appntmnt.userData.image}
                alt=""
              />
              <p>{appntmnt.userData.name}</p>
            </div>
            <p className="text-xs border border-primary rounded-lg h-5 flex items-center justify-center">
              {appntmnt.payment ? "Online" : "Cash"}
            </p>
            <p className="max-sm:hidden">
              {calculateAge(appntmnt.userData.dob)}
            </p>
            <p>
              {formatSlotDate(appntmnt.slotDate)} {appntmnt.slotTime}
            </p>
            <p>{currencySymbol}{appntmnt.amount}</p>
            {appntmnt.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : appntmnt.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(appntmnt._id)}
                  className="w-8 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(appntmnt._id)}
                  className="w-8 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
