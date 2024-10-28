import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
// import {}
const Home = () => {
  return (
    <>
    <Navbar />
    <div className='min-h-screen flex flex-col justify-between bg-gray-100'>
      {/* Hero Section */}
      <header className='relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-20 px-4'>
        <h1 className='text-5xl font-extrabold mb-4'>Alzheimer Disease Detection App</h1>
        <p className='text-lg font-medium mb-8'>Stay ahead of your health by assessing your risk of Alzheimer’s disease and receiving personalized recommendations tailored to your lifestyle.</p>
        <div className='flex justify-center space-x-6'>
          <Link to='/model1'>
            <button className='px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-md hover:bg-gray-200 transition duration-300'>
            Alzheimer Disease Detection
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className='py-16 px-6 flex'>
        <div className='max-w-7xl mx-auto flex flex-col items-center'>
          <h2 className='text-4xl font-bold text-gray-800 text-center mb-12'>Why Use Our App?</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <img src='../images/home0.jpg' alt='Predict' className='w-16 h-16 mb-4 mx-auto' />
              <h3 className='text-2xl font-bold text-center mb-2'>Accurate Predictions</h3>
              <p className='text-center text-gray-600'>Get results using modern machine learning models.</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <img src='../images/home1.jpg' alt='Personalized' className='w-16 h-16 mb-4 mx-auto' />
              <h3 className='text-2xl font-bold text-center mb-2'>Personalized Suggestions</h3>
              <p className='text-center text-gray-600'>Receive lifestyle and health suggestions based on your risk factors.</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <img src='../images/home2.jpg' alt='Blogs' className='w-16 h-16 mb-4 mx-auto' />
              <h3 className='text-2xl font-bold text-center mb-2'>Informative Blogs</h3>
              <p className='text-center text-gray-600'>Learn more about diabetes through our curated articles.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Navigation Buttons Section */}
      <section className='py-16 bg-gray-200'>
        <div className='max-w-7xl mx-auto flex flex-col items-center space-y-6'>
          <h2 className='text-3xl font-bold text-gray-800'>Navigate to Explore More</h2>
          <div className='flex flex-wrap justify-center gap-6'>
            <Link to='/model1'>
              <button className='px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300'>Alzheimer Disease Detection</button>
            </Link>
            <Link to='/blogs'>
              <button className='px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300'>Blogs</button>
            </Link>
            {/* <Link to='/exercise'>
              <button className='px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300'>Exercise</button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 bg-gray-800 text-white text-center'>
        <p>&copy; 2024 Diabetes Prediction App. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default Home;
