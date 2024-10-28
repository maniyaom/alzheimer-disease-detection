import React from "react";
import BlogCard from "./BlogCard"; // Assuming BlogCard is in the same directory
import Navbar from '../components/Navbar';

const blogData = [
  {
    title: "Understanding Alzheimer's Disease",
    description:
      "Alzheimer's disease is a progressive disorder that causes brain cells to degenerate and die. It’s the most common cause of dementia.",
    imgSrc: "https://media.istockphoto.com/id/648706624/photo/alzheimers-disease-concept-brain-degenerative-diseases-parkinson.jpg?s=2048x2048&w=is&k=20&c=Y_-Ekwhkh9b94AYbwUpO_zJpmBtHKFLjAV3C_obd7J4=",
    link: "https://www.alz.org/alzheimers-dementia/what-is-alzheimers",
  },
  {
    title: "Early Signs and Symptoms of Alzheimer's",
    description:
      "Memory loss, confusion, and difficulty completing familiar tasks are early signs of Alzheimer's disease. Recognizing them is crucial for timely intervention.",
    imgSrc: "https://media.istockphoto.com/id/97873871/photo/mri-brain-scan-of-head-and-skull-with-hand-pointing.jpg?s=2048x2048&w=is&k=20&c=ljKHf5336kkoDlXn-Q9aFWp22sxkvYq9svRxIOIqDuA=",
    link: "https://www.nia.nih.gov/health/what-are-signs-alzheimers-disease",
  },
  {
    title: "Alzheimer's Disease Diagnosis and Treatment",
    description:
      "Learn about the diagnosis and treatment options available for Alzheimer's, including medications that can slow progression and improve quality of life.",
    imgSrc: "https://cdn.pixabay.com/photo/2013/07/13/11/44/capsule-158568_1280.png",
    link: "https://www.mayoclinic.org/diseases-conditions/alzheimers-disease/diagnosis-treatment/drc-20350453",
  },
  {
    title: "Alzheimer's Research: Progress and Hope",
    description:
      "Research on Alzheimer's is progressing, focusing on better treatments, understanding its causes, and working towards a cure.",
    imgSrc: "https://cdn.pixabay.com/photo/2021/03/02/17/38/science-6063326_1280.png",
    link: "https://www.alzheimersresearchuk.org/research/what-we-do/",
  },
  {
    title: "Preventing Alzheimer's Disease",
    description:
      "While there is no cure for Alzheimer's, certain lifestyle changes can help reduce the risk, including a healthy diet, regular exercise, and mental stimulation.",
    imgSrc: "https://cdn.pixabay.com/photo/2024/05/26/19/51/nursing-8789373_1280.png",
    link: "https://www.health.harvard.edu/mind-and-mood/preventing-alzheimers-disease-is-within-your-control",
  },
  {
    title: "Caregiving for Alzheimer's Patients",
    description:
      "Caring for someone with Alzheimer's requires patience, knowledge, and support. Learn how to provide effective care and manage the challenges.",
    imgSrc: "https://media.istockphoto.com/id/1214355991/vector/home-care-services-for-seniors-nurse-or-volunteer-worker-taking-care-of-elderly-woman-vector.jpg?s=2048x2048&w=is&k=20&c=9R8DZv1PTEibqWeLX0e4w1uTN68c00da9evY2ae6cpQ=",
    link: "https://www.alz.org/help-support/caregiving",
  },
  // Add more blog entries if needed
];

const Blogs = () => {
  return (
    <>
    <Navbar />
    <div className='flex flex-wrap justify-around mt-10'>
      {blogData.map((blog, index) => (
        <BlogCard key={index} title={blog.title} description={blog.description} imgSrc={blog.imgSrc} link={blog.link} />
      ))}
    </div>
    </>
  );
};

export default Blogs;
