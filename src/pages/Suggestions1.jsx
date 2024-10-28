import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Suggestions1 = () => {
  const location = useLocation();
  const { formData, prediction } = location.state || {}; // Fallback if no state is passed

  const [showAll, setShowAll] = useState(false);

  if (!formData) {
    return <p>No form data available. Please submit the form again.</p>;
  }

  const generateSuggestions = (formData) => {
    let suggestions = [];

    // Age-related suggestions
    if (formData.age >= 60) {
      suggestions.push("At your age, regular cognitive screenings are essential. Engage in activities that stimulate your brain, such as puzzles or learning a new skill.");
    } else if (formData.age >= 41 && formData.age < 60) {
      suggestions.push("Consider regular check-ups to monitor cognitive health, as early detection is crucial. Stay active and maintain social connections.");
    } else {
      suggestions.push("Maintain a healthy lifestyle through balanced nutrition, regular exercise, and social interactions. Early lifestyle habits can have a long-term impact.");
    }

    // Family history considerations
    if (formData.familyHistoryAlzheimers === "Yes") {
      suggestions.push("Since you have a family history of Alzheimer's, it's important to be proactive about cognitive health. Consider discussing genetic counseling with a healthcare provider.");
    }

    // Health conditions
    if (formData.hypertension === "Yes") {
      suggestions.push("Manage your blood pressure effectively, as high blood pressure can increase the risk of cognitive decline. Regular exercise and a balanced diet can help.");
    }
    if (formData.cardiovascularDisease === "Yes") {
      suggestions.push("Prioritize cardiovascular health through regular exercise and heart-healthy eating. Poor cardiovascular health can impact brain health.");
    }
    if (formData.diabetes === "Yes") {
      suggestions.push("Monitor your blood sugar levels and maintain a healthy diet to reduce the risk of cognitive impairment associated with diabetes.");
    }

    // Lifestyle factors
    if (formData.smoking === "Yes") {
      suggestions.push("Consider quitting smoking. Research shows that smoking can increase the risk of cognitive decline and dementia.");
    }
    if (formData.alcohol === "Frequently") {
      suggestions.push("Limit alcohol consumption. Excessive drinking can impair cognitive functions and may contribute to dementia risk.");
    }
    if (formData.physicalActivity === "Rarely" || formData.physicalActivity === "Never") {
      suggestions.push("Incorporate regular physical activity into your routine. Aim for at least 150 minutes of moderate exercise weekly to enhance overall brain health.");
    } else if (formData.physicalActivity === "Daily") {
      suggestions.push("Great job maintaining daily exercise! Consider varying your workouts to avoid burnout and keep your routine enjoyable.");
    } else if (formData.physicalActivity === "Weekly") {
      suggestions.push("Consider increasing the frequency of your physical activity to daily. Even short walks can significantly improve your cognitive health.");
    }

    // Diet quality
    if (formData.dietQuality === "Very Poor") {
      suggestions.push("Improve your diet by including more fruits, vegetables, whole grains, and omega-3 fatty acids. A healthy diet can protect brain health.");
    } else if (formData.dietQuality === "Poor") {
      suggestions.push("Consider gradually improving your diet quality by incorporating healthier food options, such as lean proteins and whole grains.");
    } else if (formData.dietQuality === "Good") {
      suggestions.push("You're doing well with your diet! Maintaining good nutrition can further benefit your cognitive health.");
    } else if (formData.dietQuality === "Very Good") {
      suggestions.push("Excellent job maintaining a very good diet! Consider sharing your healthy recipes with friends or family to inspire others.");
    }

    // Sleep quality
    if (formData.sleepQuality === "Very Poor") {
      suggestions.push("Focus on improving your sleep quality, as poor sleep can negatively impact cognitive function. Establish a regular sleep routine and create a restful environment.");
    } else if (formData.sleepQuality === "Poor") {
      suggestions.push("Consider setting a consistent sleep schedule to enhance your sleep quality. Avoid screens before bedtime to help you wind down.");
    } else if (formData.sleepQuality === "Good") {
      suggestions.push("You're doing well with your sleep! Maintaining good sleep hygiene can further benefit your cognitive health.");
    } else if (formData.sleepQuality === "Very Good") {
      suggestions.push("Great job on achieving very good sleep quality! Quality sleep is essential for optimal cognitive functioning. Keep it up!");
    }

    // Mental and emotional health
    if (formData.depression === "Yes") {
      suggestions.push("Seek support for managing depression. Mental health is crucial for cognitive function. Consider counseling or therapy.");
    } else if (formData.depression === "No" && formData.stress === "High") {
      suggestions.push("Try to manage your stress levels through relaxation techniques, such as meditation or yoga, which can benefit your overall mental health.");
    }

    if (formData.memoryComplaints === "Yes") {
      suggestions.push("Discuss your memory concerns with a healthcare professional to assess cognitive health and explore possible interventions.");
    }

    // Encouragement for social activities
    if (formData.socialEngagement === "Low") {
      suggestions.push("Increase your social interactions by joining clubs or groups that align with your interests. Social engagement is beneficial for cognitive health.");
    } else if (formData.socialEngagement === "Moderate") {
      suggestions.push("You're doing well with social engagement! Consider exploring new groups or activities to further enrich your social life.");
    } else if (formData.socialEngagement === "High") {
      suggestions.push("Fantastic job maintaining high social engagement! Stay connected with friends and family, as this is key for mental well-being.");
    }

    // Overall recommendation
    suggestions.push("Engage in activities that promote mental well-being, such as reading, socializing, or engaging in hobbies. Stay connected with loved ones and participate in community activities.");

    // General suggestions
    suggestions.push("Stay informed about Alzheimer's disease and its risk factors by reading reputable sources or attending community health workshops.");
    suggestions.push("Consider participating in brain-training games or puzzles. These can help enhance cognitive function and memory skills.");
    suggestions.push("Engage in mindfulness practices, such as meditation or deep-breathing exercises, to reduce stress and improve mental clarity.");
    suggestions.push("Volunteer or help others in your community. Engaging in altruistic activities can enhance your mental well-being and foster social connections.");

    return suggestions;
  };

  const userSuggestions = generateSuggestions(formData);
  const displayedSuggestions = showAll ? userSuggestions : userSuggestions.slice(0, 4);

  const handleToggleSuggestions = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 mt-12">
      {console.log('Prediction State:', prediction)}

      {prediction !== null && (
        <div
          className={`w-full max-w-3xl mt-4 p-6 border-4 rounded-lg shadow-lg ${
            prediction > 50
              ? 'border-red-500 bg-red-100'
              : 'border-green-500 bg-green-100'
          }`}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Prediction Result :
          </h2>
          <p
            className={`text-5xl font-bold text-center ${
              prediction > 50 ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {prediction}%
          </p>
          <p className="text-lg text-center mt-4 text-gray-700">
            {prediction > 50
              ? 'High risk detected. Take immediate action to manage your health.'
              : 'You are in a safer range, but continuous care is important.'}
          </p>
        </div>
      )}

      <div className="max-w-4xl w-full mt-6 p-8 bg-white rounded-lg shadow-lg">
        {/* Highlight Box */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold text-blue-700 text-lg text-center">
            Suggestions to Improve Diabetes Health
          </p>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Your Personalized Suggestions
        </h1>

        <ul className="list-disc list-inside space-y-4">
          {displayedSuggestions.length === 0 ? (
            <li className="text-lg text-gray-700 italic">No suggestions available at this time.</li>
          ) : (
            displayedSuggestions.map((suggestion, index) => (
              <li key={index} className="text-lg text-gray-700">
                <span className="font-bold text-gray-900">Suggestion {index + 1}:</span> {suggestion}
              </li>
            ))
          )}
        </ul>

        {/* Toggle Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleSuggestions}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {prediction > 50 && (
  <div className="w-full max-w-4xl mt-6">
    <div className="bg-blue-50 border-t-4 border-blue-500 p-6 rounded-lg shadow-lg flex items-center">
      <div className="text-blue-500 text-4xl mr-4">
        <i className="fas fa-stethoscope"></i>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">Recommended Actions</h3>
        <p className="text-lg text-gray-600 mt-2">
          We advise you to consult with your healthcare provider to schedule a comprehensive health check-up. 
          Staying proactive in monitoring your health is essential.
        </p>
      </div>
    </div>
  </div>
)}


    </div>
</>



  );
};

export default Suggestions1;
