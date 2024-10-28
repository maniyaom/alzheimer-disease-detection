import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import moment from "moment";
import { FaChartBar } from "react-icons/fa";

const PredictionChart = ({ email }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/history?email=${email}`);
        const response = await axios.get(`https://diabetes-webapp.onrender.com/api/history?email=${email}`);
        const model1History = response.data.model1History;

        // Process the data to group by date and calculate average prediction
        const groupedData = model1History.reduce((acc, item) => {
          const date = moment(item.createdAt).format("YYYY-MM-DD"); // Group by date

          if (!acc[date]) {
            acc[date] = { date, totalOutcome: parseFloat(item.outcome), count: 1 };
          } else {
            acc[date].totalOutcome += parseFloat(item.outcome);
            acc[date].count += 1;
          }

          return acc;
        }, {});

        // Prepare final data with average prediction percentage per day
        const finalData = Object.values(groupedData)
          .map(({ date, totalOutcome, count }) => ({
            date,
            avgOutcome: (totalOutcome / count).toFixed(2), // Average outcome
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order

        setChartData(finalData);
      } catch (error) {
        console.error("Error fetching prediction data", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className='chart-container bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-8'>
      <div className='flex items-center mb-2'>
        <FaChartBar className='text-green-600 w-12 h-12 mr-2' />
        <h2 className='text-2xl font-bold text-gray-800'>Model 1 Prediction Chart</h2>
      </div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='avgOutcome' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for chart</p>
      )}
    </div>
  );
};

export default PredictionChart;
