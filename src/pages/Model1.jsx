import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';

// Mappings for binary and ordinal values
const binary_mappings = {
  gender: { Male: 1, Female: 0 },
  smoking: { Yes: 1, No: 0 },
  family_history_alzheimers: { Yes: 1, No: 0 },
  cardiovascular_disease: { Yes: 1, No: 0 },
  diabetes: { Yes: 1, No: 0 },
  depression: { Yes: 1, No: 0 },
  head_injury: { Yes: 1, No: 0 },
  hypertension: { Yes: 1, No: 0 },
  memory_complaints: { Yes: 1, No: 0 },
  behavioral_problems: { Yes: 1, No: 0 },
  confusion: { Yes: 1, No: 0 },
  personality_changes: { Yes: 1, No: 0 },
  difficulty_completing_tasks: { Yes: 1, No: 0 },
  forgetfulness: { Yes: 1, No: 0 },
};

const ordinal_mappings = {
  ethnicity: { "Caucasian": 2, "Other": 3, "African American": 0, "Asian": 1 },
  education_level: { "Bachelor": 0, "None": 3, "High School": 1, "Higher": 2 },
  alcohol_consumption: { "Never": 0, "Rarely": 1, "Occasionally": 2, "Frequently": 3, "Daily": 4 },
  physical_activity: { "Never": 0, "Rarely": 1, "Monthly": 2, "Weekly": 3, "Daily": 4 },
  diet_quality: {
    "Very Poor": 0,
    "Poor": 1,
    "Moderate": 2,
    "Good": 3,
    "Excellent": 4
  },
  sleep_quality: { "Very Poor": 0, "Poor": 1, "Good": 2, "Excellent": 3 }
};

// Function to encode user data
const encodeUserData = (userData) => {
  // BMI calculation (weight in kg, height in cm)
  const height = parseInt(userData.height);
  const weight = parseInt(userData.weight);
  const bmi = weight / (height / 100) ** 2;

  // Prepare encoding array
  const encodingArray = [
    parseInt(userData.age), // Age (numeric)
    binary_mappings.gender[userData.gender], // Gender
    ordinal_mappings.ethnicity[userData.ethnicity], // Ethnicity
    ordinal_mappings.education_level[userData.educationalLevel], // Education Level
    bmi, // BMI
    binary_mappings.smoking[userData.smoking], // Smoking
    ordinal_mappings.alcohol_consumption[userData.alcohol], // Alcohol Consumption
    ordinal_mappings.physical_activity[userData.physicalActivity], // Physical Activity
    ordinal_mappings.diet_quality[userData.dietQuality], // Diet Quality
    ordinal_mappings.sleep_quality[userData.sleepQuality], // Sleep Quality
    binary_mappings.family_history_alzheimers[userData.familyHistoryAlzheimers], // Family History of Alzheimer's
    binary_mappings.cardiovascular_disease[userData.cardiovascularDisease], // Cardiovascular Disease
    binary_mappings.diabetes[userData.diabetes], // Diabetes
    binary_mappings.depression[userData.depression], // Depression
    binary_mappings.head_injury[userData.headInjury], // Head Injury
    binary_mappings.hypertension[userData.hypertension], // Hypertension
    parseInt(userData.systolicBP), // Systolic Blood Pressure
    parseInt(userData.diastolicBP), // Diastolic Blood Pressure
    parseInt(userData.cholesterolTotal), // Total Cholesterol
    parseInt(userData.cholesterolLDL), // LDL Cholesterol
    parseInt(userData.cholesterolHDL), // HDL Cholesterol
    parseInt(userData.cholesterolTriglycerides), // Triglycerides
    parseInt(userData.MMSE), // Mini-Mental State Exam (MMSE) score
    parseInt(userData.functionalAssessment), // Functional Assessment score
    binary_mappings.memory_complaints[userData.memoryComplaints], // Memory Complaints
    binary_mappings.behavioral_problems[userData.behavioralProblems], // Behavioral Problems
    parseInt(userData.ADL), // ADL (Activities of Daily Living)
    binary_mappings.confusion[userData.confusion], // Confusion
    binary_mappings.personality_changes[userData.personalityChanges], // Personality Changes
    binary_mappings.difficulty_completing_tasks[userData.difficultyCompletingTasks], // Difficulty Completing Tasks
    binary_mappings.forgetfulness[userData.forgetfulness] // Forgetfulness
  ];

  return encodingArray;
};


const Model1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [formData, setFormData] = useState({
    age: "34",  // Input field for age, left blank by default
    gender: "Male",  // Default value set to "Male"
    ethnicity: "Caucasian",  // Default value set to "Caucasian"
    educationalLevel: "Bachelor",  // Default value set to "Bachelor"
    height: "170",  // Input field for height, left blank by default
    weight: "70",  // Input field for weight, left blank by default
    // bmi will be calculated in the backend

    smoking: "No",  // Default value set to "No"
    alcohol: "Never",  // Default value set to "Never"
    physicalActivity: "Never",  // Default value set to "Never"
    dietQuality: "Very Poor",  // Default value set to "Very Poor"
    sleepQuality: "Very Poor",  // Default value set to "Very Poor"

    familyHistoryAlzheimers: "No",  // Default value set to "No"
    cardiovascularDisease: "No",  // Default value set to "No"
    diabetes: "No",  // Default value set to "No"
    depression: "No",  // Default value set to "No"
    headInjury: "No",  // Default value set to "No"
    hypertension: "No",  // Default value set to "No"

    systolicBP: 120,  // Default value set to 120 mmHg
    diastolicBP: 80,  // Default value set to 80 mmHg

    cholesterolTotal: 200,  // Default value set to 200 mg/dL
    cholesterolLDL: 100,  // Default value set to 100 mg/dL
    cholesterolHDL: 50,  // Default value set to 50 mg/dL
    cholesterolTriglycerides: 150,  // Default value set to 150 mg/dL

    MMSE: 30,  // Default value set to 30 (perfect score)
    functionalAssessment: 10,  // Default value set to 10 (no impairment)
    memoryComplaints: "Yes",  // Default value set to "No" (0)
    behavioralProblems: "Yes",  // Default value set to "No" (0)
    ADL: 10,  // Default value set to 10 (no impairment)
    confusion: "Yes",  // Default value set to "No" (0)
    personalityChanges: "Yes",  // Default value set to "No" (0)
    difficultyCompletingTasks: "Yes",  // Default value set to "No" (0)
    forgetfulness: "Yes",  // Default value set to "No" (0)
  });





  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("authEmail");
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);





  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["physicalActivity", "sleepIssues", "symptoms", "otherMedicalConditions"].includes(name)) {
      let updatedValues;

      if (value === "None") {
        // If "None" is selected, clear other selections
        updatedValues = checked ? ["None"] : [];
      } else {
        // If any other option is selected, unselect "None"
        updatedValues = checked ? formData[name].filter((item) => item !== "None").concat(value) : formData[name].filter((item) => item !== value);
      }

      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "checkbox") {
      // General checkbox handling for other fields
      const newValues = checked ? [...formData[name], value] : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: newValues });
    } else {
      // General handling for other input types
      setFormData({ ...formData, [name]: value });
    }
  };





  const validateForm = () => {
    const errors = {};

    // Parse the numeric fields to make sure comparisons work correctly
    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const familyHistory = parseInt(formData.familyHistory, 10);

    // Age validation: between 1 and 120
    if (!age || isNaN(age) || age <= 0 || age > 120) {
      errors.age = "Age must be a valid number between 1 and 120.";
    }

    // Gender validation: must select a valid option
    if (!formData.gender || (formData.gender !== "Male" && formData.gender !== "Female")) {
      errors.gender = "Please select a valid gender.";
    }

    // Height validation: between 50 and 250 cm
    if (!height || isNaN(height) || height <= 50 || height > 250) {
      errors.height = "Height must be a valid number between 50 and 250 cm.";
    }

    // Weight validation: between 1 and 300 kg
    if (!weight || isNaN(weight) || weight <= 0 || weight > 300) {
      errors.weight = "Weight must be a valid number between 1 and 300 kg.";
    }

    // Ethnicity validation: must select a valid option
    if (!formData.ethnicity || ["Caucasian", "Other", "African American", "Asian"].indexOf(formData.ethnicity) === -1) {
      errors.ethnicity = "Please select a valid ethnicity.";
    }

    // Educational level validation: must select a valid option
    if (!formData.educationalLevel || ["Bachelor", "None", "High School", "Higher"].indexOf(formData.educationalLevel) === -1) {
      errors.educationalLevel = "Please select a valid educational level.";
    }

    // Family history validation: must be a non-negative integer
    if (!Number.isInteger(familyHistory) || familyHistory < 0) {
      errors.familyHistory = "Family History must be a non-negative number.";
    }

    // Alcohol validation: must select a valid option
    if (!formData.alcohol || ["Never", "Rarely", "Occasionally", "Frequently", "Daily"].indexOf(formData.alcohol) === -1) {
      errors.alcohol = "Please select a valid alcohol consumption frequency.";
    }

    // Physical Activity validation: must select a valid option
    if (!formData.physicalActivity || ["Never", "Rarely", "Monthly", "Weekly", "Daily"].indexOf(formData.physicalActivity) === -1) {
      errors.physicalActivity = "Please select a valid physical activity frequency.";
    }

    // Diet Quality validation: must select a valid option
    if (!formData.dietQuality || ["Very Poor", "Poor", "Moderate", "Good", "Excellent"].indexOf(formData.dietQuality) === -1) {
      errors.dietQuality = "Please select a valid diet quality.";
    }

    // Sleep Quality validation: must select a valid option
    if (!formData.sleepQuality || ["Very Poor", "Poor", "Good", "Excellent"].indexOf(formData.sleepQuality) === -1) {
      errors.sleepQuality = "Please select a valid sleep quality.";
    }

    // Set validation errors
    setValidationErrors(errors);

    // Return true if no validation errors exist
    return Object.keys(errors).length === 0;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // if (!validateForm()) {
    //   console.log("Form is invalid");
    //   return; // Stop if form is invalid
    // }

    console.log("Form is valid, proceeding...");

    setLoading(true);
    setError(null);

    const encodingArray = encodeUserData(formData);
    console.log("Encoded data:", encodingArray); // Log encoded data for debugging

    try {
      // const response = await axios.post("http://127.0.0.1:5000/predict", { ...encodingArray, email, features: formData });
      const response = await axios.post("https://supreme-nicholle-alzheimer-disease-detection-backend-dae7eba0.koyeb.app//predict", encodingArray);

      console.log('Response:', response);

      const outcome = response.data.prediction;
      setPrediction(outcome);
      navigate("/Suggestions1", { state: { formData, prediction: outcome } });
    } catch (err) {
      console.error('Error in prediction:', err);
      setError("Error in prediction. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset after try/catch
    }
  };



  return (
    <>
    <Navbar />
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-12'>
      <div className='w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-6'>Alzheimer's Assessment Form</h1>
        <form onSubmit={handleSubmit}>


          <h2 className="font-bold text-lg text-gray-700 underline">Demographic Details        </h2> <br />

          {/* Age and Gender */}
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='font-bold text-gray-700'>Age *</label>
              <input
                type='number'
                name='age'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.age ? "border-red-500" : "border-gray-300"}`}
                value={formData.age}
                onChange={handleChange}
                required
              />
              {validationErrors.age && <p className='text-red-500'>{validationErrors.age}</p>}
            </div>
            <div>
              <label className='font-bold block text-gray-700'>Gender *</label>
              <select name='gender' className='mt-1 p-2 border border-gray-300 w-full rounded-lg' value={formData.gender} onChange={handleChange} required>
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          </div>

          {/* Ethnicity */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Ethnicity *</label>
            <select
              name='ethnicity'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.ethnicity}
              onChange={handleChange}
              required
            >
              <option value=''>Select Ethnicity</option>
              <option value='Caucasian'>Caucasian</option>
              <option value='African American'>African American</option>
              <option value='Asian'>Asian</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* Educational Level */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Educational Level *</label>
            <select
              name='educationalLevel'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.educationalLevel}
              onChange={handleChange}
              required
            >
              <option value=''>Select Educational Level</option>
              <option value='None'>None</option>
              <option value='High School'>High School</option>
              <option value='Bachelor'>Bachelor</option>
              <option value='Higher'>Higher</option>
            </select>
          </div>


          <h2 className="font-bold text-lg text-gray-700 underline">Demographic Details </h2> <br />


          {/* Height and Weight */}
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='font-bold text-gray-700'>Height (cm) *</label>
              <input
                type='number'
                name='height'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.height ? "border-red-500" : "border-gray-300"}`}
                value={formData.height}
                onChange={handleChange}
                required
              />
              {validationErrors.height && <p className='text-red-500'>{validationErrors.height}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>Weight (kg) *</label>
              <input
                type='number'
                name='weight'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.weight ? "border-red-500" : "border-gray-300"}`}
                value={formData.weight}
                onChange={handleChange}
                required
              />
              {validationErrors.weight && <p className='text-red-500'>{validationErrors.weight}</p>}
            </div>
          </div>

          {/* Smoking and Alcohol Consumption */}
          <div className='mb-6 grid grid-cols-2 gap-4'>
            <div>
              <label className='font-bold text-gray-700'>Smoking *</label>
              <select
                name='smoking'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.smoking}
                onChange={handleChange}
                required
              >
                <option value=''>Select Smoking Habit</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>
            <div>
              <label className='font-bold text-gray-700'>Alcohol Consumption *</label>
              <select
                name='alcohol'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.alcohol}
                onChange={handleChange}
                required
              >
                <option value=''>Select Frequency</option>
                <option value='Never'>Never</option>
                <option value='Rarely'>Rarely</option>
                <option value='Occasionally'>Occasionally</option>
                <option value='Frequently'>Frequently</option>
                <option value='Daily'>Daily</option>
              </select>
            </div>
          </div>

          {/* Physical Activity */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Physical Activity *</label>
            <select
              name='physicalActivity'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.physicalActivity}
              onChange={handleChange}
              required
            >
              <option value=''>Select Frequency</option>
              <option value='Never'>Never</option>
              <option value='Rarely'>Rarely</option>
              <option value='Monthly'>Monthly</option>
              <option value='Weekly'>Weekly</option>
              <option value='Daily'>Daily</option>
            </select>
          </div>

          {/* Diet Quality */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Diet Quality *</label>
            <select
              name='dietQuality'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.dietQuality}
              onChange={handleChange}
              required
            >

              <option value=''>Select Diet Quality</option>
              <option value='Very Poor'>Very Poor (High processed/sugary foods)</option>
              <option value='Poor'>Poor (Occasional processed/sugary foods)</option>
              <option value='Moderate'>Moderate (Balanced with some processed foods)</option>
              <option value='Good'>Good (Mostly whole and healthy foods)</option>
              <option value='Excellent'>Excellent (Strictly whole and nutrient-rich foods)</option>
            </select>
          </div>

          {/* Sleep Quality */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Sleep Quality *</label>
            <select
              name='sleepQuality'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.sleepQuality}
              onChange={handleChange}
              required
            >
              <option value=''>Select Sleep Quality</option>
              <option value='Very Poor'>Very Poor</option>
              <option value='Poor'>Poor</option>
              <option value='Good'>Good</option>
              <option value='Excellent'>Excellent</option>
            </select>
          </div>


          <h2 className="font-bold text-lg text-gray-700 underline">Medical History</h2> <br />


          <div className="grid grid-cols-2 gap-4">
            {/* Family History of Alzheimer's */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Family History of Alzheimer's</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="familyHistoryAlzheimers" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="familyHistoryAlzheimers" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>

            {/* Cardiovascular Disease */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Cardiovascular Disease</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="cardiovascularDisease" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="cardiovascularDisease" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>

            {/* Diabetes */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Diabetes</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="diabetes" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="diabetes" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>

            {/* Depression */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Depression</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="depression" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="depression" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>

            {/* Head Injury */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Head Injury</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="headInjury" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="headInjury" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>

            {/* Hypertension */}
            <div className='flex items-center'>
              <label className="font-bold text-gray-700 mr-2">Hypertension</label>
              <div className='flex space-x-4'>
                <label className="inline-flex items-center">
                  <input type="radio" name="hypertension" value="Yes" onChange={handleChange} />
                  <span className="ml-1">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="hypertension" value="No" onChange={handleChange} />
                  <span className="ml-1">No</span>
                </label>
              </div>
            </div>
          </div>  <br></br>



          <h2 className="font-bold text-lg text-gray-700 underline">Clinical Measurements</h2> <br />
          {/* Systolic and Diastolic Blood Pressure */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-gray-700">Systolic Blood Pressure (90-180 mmHg) *</label>
              <input
                type="range"
                name="systolicBP"
                min="90"
                max="180"
                className={`mt-1 w-full ${validationErrors.systolicBP ? "border-red-500" : "border-gray-300"}`}
                value={formData.systolicBP}
                onChange={handleChange}
                required
              />
              <div className="mt-2">Selected: {formData.systolicBP} mmHg</div>
              {validationErrors.systolicBP && <p className="text-red-500">{validationErrors.systolicBP}</p>}
            </div>

            <div>
              <label className="font-bold text-gray-700">Diastolic Blood Pressure (60-120 mmHg) *</label>
              <input
                type="range"
                name="diastolicBP"
                min="60"
                max="120"
                className={`mt-1 w-full ${validationErrors.diastolicBP ? "border-red-500" : "border-gray-300"}`}
                value={formData.diastolicBP}
                onChange={handleChange}
                required
              />
              <div className="mt-2">Selected: {formData.diastolicBP} mmHg</div>
              {validationErrors.diastolicBP && <p className="text-red-500">{validationErrors.diastolicBP}</p>}
            </div>
          </div>

          {/* Cholesterol Levels */}
          <div className="mb-6">
            <label className="font-bold text-gray-700">Total Cholesterol (150-300 mg/dL) *</label>
            <input
              type="range"
              name="cholesterolTotal"
              min="150"
              max="300"
              className={`mt-1 w-full ${validationErrors.cholesterolTotal ? "border-red-500" : "border-gray-300"}`}
              value={formData.cholesterolTotal}
              onChange={handleChange}
              required
            />
            <div className="mt-2">Selected: {formData.cholesterolTotal} mg/dL</div>
            {validationErrors.cholesterolTotal && <p className="text-red-500">{validationErrors.cholesterolTotal}</p>}
          </div>

          <div className="mb-6">
            <label className="font-bold text-gray-700">LDL Cholesterol (50-200 mg/dL) *</label>
            <input
              type="range"
              name="cholesterolLDL"
              min="50"
              max="200"
              className={`mt-1 w-full ${validationErrors.cholesterolLDL ? "border-red-500" : "border-gray-300"}`}
              value={formData.cholesterolLDL}
              onChange={handleChange}
              required
            />
            <div className="mt-2">Selected: {formData.cholesterolLDL} mg/dL</div>
            {validationErrors.cholesterolLDL && <p className="text-red-500">{validationErrors.cholesterolLDL}</p>}
          </div>

          <div className="mb-6">
            <label className="font-bold text-gray-700">HDL Cholesterol (20-100 mg/dL) *</label>
            <input
              type="range"
              name="cholesterolHDL"
              min="20"
              max="100"
              className={`mt-1 w-full ${validationErrors.cholesterolHDL ? "border-red-500" : "border-gray-300"}`}
              value={formData.cholesterolHDL}
              onChange={handleChange}
              required
            />
            <div className="mt-2">Selected: {formData.cholesterolHDL} mg/dL</div>
            {validationErrors.cholesterolHDL && <p className="text-red-500">{validationErrors.cholesterolHDL}</p>}
          </div>

          <div className="mb-6">
            <label className="font-bold text-gray-700">Triglycerides (50-400 mg/dL) *</label>
            <input
              type="range"
              name="cholesterolTriglycerides"
              min="50"
              max="400"
              className={`mt-1 w-full ${validationErrors.cholesterolTriglycerides ? "border-red-500" : "border-gray-300"}`}
              value={formData.cholesterolTriglycerides}
              onChange={handleChange}
              required
            />
            <div className="mt-2">Selected: {formData.cholesterolTriglycerides} mg/dL</div>
            {validationErrors.cholesterolTriglycerides && <p className="text-red-500">{validationErrors.cholesterolTriglycerides}</p>}
          </div>



          <h2 className="font-bold text-lg text-gray-700 underline">Cognitive and Functional Assessments</h2> <br />

          <div className="grid grid-cols-2 gap-4">
            {/* MMSE */}
            <div className='mb-4'>
              <label className='font-bold text-gray-700'>MMSE (0-30) (Mini-Mental State Examination score)</label>
              <input
                type='range'
                min='0'
                max='30'
                value={formData.MMSE}
                name='MMSE'
                onChange={handleChange}
                className='w-full'
              />
              <span className='text-gray-700'>{formData.MMSE}</span>
            </div>

            {/* Functional Assessment */}
            <div className='mb-4'>
              <label className='font-bold text-gray-700'>Functional Assessment (0-10)</label>
              <input
                type='range'
                min='0'
                max='10'
                value={formData.functionalAssessment}
                name='functionalAssessment'
                onChange={handleChange}
                className='w-full'
              />
              <span className='text-gray-700'>{formData.functionalAssessment}</span>
            </div>

            {/* Memory Complaints */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Memory Complaints *</label>
              <select
                name='memoryComplaints'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.memoryComplaints}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            {/* Behavioral Problems */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Behavioral Problems *</label>
              <select
                name='behavioralProblems'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.behavioralProblems}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>


            {/* ADL */}
            <div className='mb-4'>
              <label className='font-bold text-gray-700'>ADL (0-10) (Activities of Daily Living score)</label>
              <input
                type='range'
                min='0'
                max='10'
                value={formData.ADL}
                name='ADL'
                onChange={handleChange}
                className='w-full'
              />
              <span className='text-gray-700'>{formData.ADL}</span>
            </div>  </div>



          <h2 className="font-bold text-lg text-gray-700 underline">Symptoms</h2> <br />
          <div className="grid grid-cols-2 gap-4">
            {/* Confusion */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Confusion *</label>
              <select
                name='confusion'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.confusion}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            {/* Personality Changes */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Personality Changes *</label>
              <select
                name='personalityChanges'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.personalityChanges}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            {/* Difficulty Completing Tasks */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Difficulty Completing Tasks *</label>
              <select
                name='difficultyCompletingTasks'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.difficultyCompletingTasks}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            {/* Forgetfulness */}
            <div className='mb-4'>
              <label className="font-bold text-gray-700">Forgetfulness *</label>
              <select
                name='forgetfulness'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.forgetfulness}
                onChange={handleChange}
                required
              >
                <option value=''>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div> <br />










          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full'>
            {loading ? "Predicting..." : "Predict"}
          </button>


        </form>
      </div>
    </div>
    </>
  );
};

export default Model1;
