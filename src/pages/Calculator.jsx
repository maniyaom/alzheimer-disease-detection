import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Calculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [activityLevel, setActivityLevel] = useState('Sedentary');
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const [firstDegree, setFirstDegree] = useState(0);
  const [secondDegree, setSecondDegree] = useState(0);
  const [pedigreeFunction, setPedigreeFunction] = useState(null);

  // Function to calculate BMI
  const calculateBMI = (e) => {
    e.preventDefault();
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100; // Convert cm to meters
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);
    } else {
      setBmi(null);
    }
  };

  // Function to calculate Pedigree Function (simple version)
  const calculatePedigreeFunction = (e) => {
    e.preventDefault();
    if (firstDegree >= 0 && secondDegree >= 0) {
      const calculatedPedigree = (0.3 * firstDegree + 0.15 * secondDegree).toFixed(2);
      setPedigreeFunction(calculatedPedigree);
    } else {
      setPedigreeFunction(null);
    }
  };

  // Function to calculate daily calorie needs using Mifflin-St Jeor Equation
  const calculateCalories = (e) => {
    e.preventDefault();
    if (weight > 0 && height > 0 && age > 0) {
      let bmr;
      if (gender === 'Male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      const activityMultiplier = {
        Sedentary: 1.2,
        Light: 1.375,
        Moderate: 1.55,
        Active: 1.725,
        VeryActive: 1.9,
      };

      const totalCalories = (bmr * activityMultiplier[activityLevel]).toFixed(0);
      setCalories(totalCalories);
    } else {
      setCalories(null);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-row items-top justify-center bg-gray-100 p-6 mt-12">
      {/* BMI Calculator */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">BMI Calculator</h2>
        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Calculate BMI
          </button>
        </form>
        {bmi && (
          <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
            <p className="font-semibold">Your BMI is: {bmi}</p>
          </div>
        )}
      </div>

      {/* Calorie Calculator */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">Calorie Calculator</h2>
        <form onSubmit={calculateCalories} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-orange-200 focus:outline-none"
              required
            >
              <option value="Sedentary">Sedentary (little or no exercise)</option>
              <option value="Light">Light (exercise 1-3 days/week)</option>
              <option value="Moderate">Moderate (exercise 4-5 days/week)</option>
              <option value="Active">Active (daily exercise)</option>
              <option value="VeryActive">Very Active (intense exercise daily)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
          >
            Calculate Calories
          </button>
        </form>
        {calories && (
          <div className="mt-4 p-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700">
            <p className="font-semibold">Your estimated daily calorie needs are: {calories} kcal</p>
          </div>
        )}
      </div>

      {/* Pedigree Function Calculator */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Pedigree Function Calculator</h2>
        <form onSubmit={calculatePedigreeFunction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Family History of Diabetes(1st Degree Connection)</label>
            <input
              type="number"
              value={firstDegree}
              onChange={(e) => setFirstDegree(e.target.value)}
              placeholder="Enter number of family members"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Family History of Diabetes(2nd Degree Connection)</label>
            <input
              type="number"
              value={secondDegree}
              onChange={(e) => setSecondDegree(e.target.value)}
              placeholder="Enter number of family members"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Calculate Pedigree Function
          </button>
        </form>
        {pedigreeFunction && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p className="font-semibold">Your Pedigree Function is: {pedigreeFunction}</p>
          </div>
        )}
      </div>

    </div>
    </>
  );
};

export default Calculator;
