import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {

  const { getDashboardData, dashBData, docAtoken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const {  currencySymbol, formatSlotDate } = useContext(AppContext);

  useEffect(() => {
    if (docAtoken) {
      getDashboardData();
    }
  }, [docAtoken]);

  return (
    dashBData && (
      <div className="m-5">

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-lg text-gray-600 font-semibold">
                {currencySymbol}{dashBData.earnigs}
              </p>
              <p className="text-sm text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-lg text-gray-600 font-semibold">
                {dashBData.appointments}
              </p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-lg text-gray-600 font-semibold">
                {dashBData.patients}
              </p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className='bg-white'>
            <div className='flex items-center gap-2.5 p-4 mt-10 border border-gray-400 rounded-t'>
                <img src={assets.list_icon} alt="" />
                <p className='font-semibold'>Latest Booking</p>
            </div>

            <div className='pt-4 border border-gray-400 border-t-0'>
                {dashBData.latestAppointments.map((appntmnt, i) => (
                <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200 cursor-pointer' key={i}>
                    <img className='w-10 rounded-full' src={appntmnt.userData.image} alt="" />
                    <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-semibold'>{appntmnt.userData.name}</p>
                    <p className='text-gray-600'>{formatSlotDate(appntmnt.slotDate)}</p>
                    </div>
                    {appntmnt.cancelled ? (
                        <p className="text-red-500 text-xs font-medium">Cancelled</p>
                    ) : appntmnt.isCompleted ? (
                        <p className="text-green-500 text-xs font-medium">Completed</p>
                    ) : (
                        <div className="flex">
                            <img
                                onClick={() => cancelAppointment(appntmnt._id)}
                                className="w-10 cursor-pointer"
                                src={assets.cancel_icon}
                                alt=""
                            />
                            <img
                                onClick={() => completeAppointment(appntmnt._id)}
                                className="w-10 cursor-pointer"
                                src={assets.tick_icon}
                                alt=""
                            />
                        </div>
                    )}
                </div>
                ))}
            </div>
        </div>

      </div>
    )
  );
};

export default DoctorDashboard;
