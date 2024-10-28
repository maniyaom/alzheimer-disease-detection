import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';
import { FaUser, FaChartBar, FaHistory } from "react-icons/fa";
import Navbar from '../components/Navbar';

import History from "../components/History";
import PredictionChart from "../components/PredictionChart";

const Profile = () => {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified)
                setUser(user);
        }
    });

    return () => unsubscribe();
}, []);

  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-gray-100 flex flex-col items-center mt-12'>
      {/* Profile Section */}
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8'>
        <div className='flex items-center space-x-4'>
          <FaUser className='text-blue-600 w-12 h-12' />
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>User Profile</h2>
            <p className='text-gray-600'>
            <b>Email:</b> {user ? user.email : "Please log in to see your email"}
            </p>
          </div>
        </div>
      </div>


      {/* Data Visualization Section */}
      {/* <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8'>
        <div className='flex items-center space-x-4'>
          <FaChartBar className='text-green-600 w-12 h-12' />
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Data Visualization</h2>
            <p className='text-gray-600'>This section is under construction.</p>
          </div>
        </div>
      </div> */}
      <PredictionChart email={user ? user.email : "Please log in to see your email"} />

      {/* History Section */}
      {/* <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8'>
        <div className='flex items-center space-x-4'>
          <FaHistory className='text-yellow-600 w-12 h-12' />
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>History</h2>
            <p className='text-gray-600'>This section is under construction.</p>
          </div>
        </div>
      </div> */}
      <History />
    </div>
    </>
  );
};

export default Profile;

// log out functionalty

// <div>
//   <h1>Profile Page</h1>
//   {isAuthenticated && (
//     <>
//       <p>Welcome, {localStorage.getItem('authEmail')}</p>
//       <button onClick={logout}>Logout</button>
//     </>
//   )}
// </div>

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user's email is stored in localStorage
//     const authEmail = localStorage.getItem('authEmail');

//     if (!authEmail) {
//       // If no email is found, redirect to login page
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     // Remove the email from localStorage when logging out
//     localStorage.removeItem('authEmail');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>Welcome, {localStorage.getItem('authEmail')}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };
