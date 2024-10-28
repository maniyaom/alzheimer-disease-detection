import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";

const History = () => {
  const [model1History, setModel1History] = useState([]);
  const [model2History, setModel2History] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const email = localStorage.getItem("authEmail");
        // const response = await axios.get("http://localhost:5000/api/history", { params: { email } });
        const response = await axios.get("https://diabetes-webapp.onrender.com/api/history", { params: { email } });
        console.log("Fetched History Response:", response.data);
        setModel1History(response.data.model1History || []);
        setModel2History(response.data.model2History || []);
      } catch (err) {
        setError("Failed to fetch history");
        console.error("Fetch error:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Function to handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);
      // Remove the deleted item from the history without re-fetching the data
      setModel1History(model1History.filter((item) => item._id !== id));
      setModel2History(model2History.filter((item) => item._id !== id));
      alert("Prediction deleted successfully!");
    } catch (error) {
      console.error("Error deleting prediction:", error);
      alert("Failed to delete prediction");
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8 mb-8'>
      {/* <div className='bg-gray-100 min-h-screen p-6'> */}

      {/* Header Section */}
      {/* <h1 className='text-3xl font-bold mb-6'>Prediction History</h1> */}
      <div className='flex items-center mb-2'>
        <FaHistory className='text-yellow-600 w-10 h-10 mr-2' />
        <h2 className='text-2xl font-bold text-gray-800'>Prediction History</h2>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p className='text-red-600'>{error}</p>
      ) : (
        <div>
          {/* Model 1 History Table */}
          <h2 className='text-2xl font-semibold mb-4'>Model 1 History</h2>
          <div className='overflow-x-auto overflow-y-auto' style={{ maxHeight: "600px" }}>
            <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border px-4 py-2'>Date</th>
                  <th className='border px-4 py-2'>Age</th>
                  <th className='border px-4 py-2'>gender</th>
                  <th className='border px-4 py-2'>height</th>
                  <th className='border px-4 py-2'>weight</th>
                  <th className='border px-4 py-2'>workIntensity</th>
                  <th className='border px-4 py-2'>exerciseFrequency</th>
                  <th className='border px-4 py-2'>physicalActivity</th>
                  <th className='border px-4 py-2'>fastFoodFrequency</th>
                  <th className='border px-4 py-2'>sugaryFoodFrequency</th>
                  <th className='border px-4 py-2'>sugaryDrinkFrequency</th>
                  <th className='border px-4 py-2'>smoking</th>
                  <th className='border px-4 py-2'>alcohol</th>
                  <th className='border px-4 py-2'>sleepDuration</th>
                  <th className='border px-4 py-2'>sleepQuality</th>
                  <th className='border px-4 py-2'>sleepIssues</th>
                  <th className='border px-4 py-2'>stressLevels</th>
                  <th className='border px-4 py-2'>highBloodPressure</th>
                  <th className='border px-4 py-2'>symptoms</th>
                  <th className='border px-4 py-2'>familyHistory</th>
                  <th className='border px-4 py-2'>otherMedicalConditions</th>
                  <th className='border px-4 py-2'>Outcome</th>
                  <th className='border px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {model1History.map((item) => (
                  <tr key={item._id}>
                    <td className='border px-4 py-2'>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className='border px-4 py-2'>{item.features.age}</td>
                    <td className='border px-4 py-2'>{item.features.gender}</td>
                    <td className='border px-4 py-2'>{item.features.height}</td>
                    <td className='border px-4 py-2'>{item.features.weight}</td>
                    <td className='border px-4 py-2'>{item.features.workIntensity}</td>
                    <td className='border px-4 py-2'>{item.features.exerciseFrequency}</td>
                    <td className='border px-4 py-2'>{item.features.physicalActivity}</td>
                    <td className='border px-4 py-2'>{item.features.fastFoodFrequency}</td>
                    <td className='border px-4 py-2'>{item.features.sugaryFoodFrequency}</td>
                    <td className='border px-4 py-2'>{item.features.sugaryDrinkFrequency}</td>
                    <td className='border px-4 py-2'>{item.features.smoking}</td>
                    <td className='border px-4 py-2'>{item.features.alcohol}</td>
                    <td className='border px-4 py-2'>{item.features.sleepDuration}</td>
                    <td className='border px-4 py-2'>{item.features.sleepQuality}</td>
                    <td className='border px-4 py-2'>{item.features.sleepIssues}</td>
                    <td className='border px-4 py-2'>{item.features.stressLevels}</td>
                    <td className='border px-4 py-2'>{item.features.highBloodPressure}</td>
                    <td className='border px-4 py-2'>{item.features.symptoms}</td>
                    <td className='border px-4 py-2'>{item.features.familyHistory}</td>
                    <td className='border px-4 py-2'>{item.features.otherMedicalConditions}</td>
                    <td className='border px-4 py-2'>{item.outcome}</td>
                    <td className='border px-4 py-2'>
                      <button className='bg-red-600 text-white px-3 py-1 rounded' onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Model 2 History Table */}
          <h2 className='text-2xl font-semibold mt-8 mb-4'>Model 2 History</h2>
          <div className='overflow-x-auto overflow-y-auto' style={{ maxHeight: "600px" }}>
            <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border px-4 py-2'>Date</th>
                  <th className='border px-4 py-2'>Pregnancies</th>
                  <th className='border px-4 py-2'>Glucose</th>
                  <th className='border px-4 py-2'>Blood Pressure</th>
                  <th className='border px-4 py-2'>Skin Thickness</th>
                  <th className='border px-4 py-2'>Insulin</th>
                  <th className='border px-4 py-2'>BMI</th>
                  <th className='border px-4 py-2'>Diabetes Pedigree Function</th>
                  <th className='border px-4 py-2'>Age</th>
                  <th className='border px-4 py-2'>Outcome</th>
                  <th className='border px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {model2History.map((item) => (
                  <tr key={item._id}>
                    <td className='border px-4 py-2'>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className='border px-4 py-2'>{item.features.Pregnancies}</td>
                    <td className='border px-4 py-2'>{item.features.Glucose}</td>
                    <td className='border px-4 py-2'>{item.features.BloodPressure}</td>
                    <td className='border px-4 py-2'>{item.features.SkinThickness}</td>
                    <td className='border px-4 py-2'>{item.features.Insulin}</td>
                    <td className='border px-4 py-2'>{item.features.BMI}</td>
                    <td className='border px-4 py-2'>{item.features.DiabetesPedigreeFunction}</td>
                    <td className='border px-4 py-2'>{item.features.Age}</td>
                    <td className='border px-4 py-2'>{item.outcome}</td>
                    <td className='border px-4 py-2'>
                      <button className='bg-red-600 text-white px-3 py-1 rounded' onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
