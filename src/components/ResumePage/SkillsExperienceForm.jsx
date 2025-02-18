import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SkillsExperienceForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [skills, setSkills] = useState(resumeInfo.skills || []);
    const navigate = useNavigate(); // Use for navigation

    useEffect(() => {
        const savedData = localStorage.getItem('resumeInfo');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setResumeInfo({
                ...parsedData,
                skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
            });
            setSkills(parsedData.skills || []);
        }
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSkills = skills.map((skill, i) =>
            i === index ? { ...skill, [name]: value } : skill
        );
        setSkills(updatedSkills);
    };

    const addNewSkill = () => {
        setSkills([...skills, { name: '', percentage: '' }]);
    };

    const handleSave = (e) => {
        e.preventDefault();

        const updatedResume = {
            ...resumeInfo,
            skills: skills,
        };

        setResumeInfo(updatedResume);

        // Retrieve existing resumes from localStorage
        let savedResumes = JSON.parse(localStorage.getItem('resumes')) || [];

        // Add or update resume
        savedResumes.push(updatedResume);

        // Save updated resumes in localStorage
        localStorage.setItem('resumes', JSON.stringify(savedResumes));

        // Show toast notification
        toast.success("Resume Saved!");

        // Navigate to Card Page
        setTimeout(() => {
            navigate('/card-page');
        }, 1500); // Delay to show the toast
    };

    const deleteSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">Skills Experience</h2>
            <p className="text-sm text-gray-600">Update your skills experience below</p>

            {skills.map((skill, index) => (
                <div key={index} className="mt-4">
                    <form className="space-y-4 mt-3">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Skill Name</label>
                            <input
                                type="text"
                                name="name"
                                value={skill.name}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your Skill Name"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Percentage</label>
                            <input
                                type="text"
                                name="percentage"
                                value={skill.percentage}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your Percentage"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => deleteSkill(index)}
                            className="w-20 cursor-pointer mt-3 ml-3 bg-black text-white font-semibold p-2 rounded-lg shadow-md border border-primary"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:justify-between">
                <button
                    onClick={addNewSkill}
                    className="cursor-pointer mt-4 mb-4 p-2 bg-black text-white rounded-lg w-full sm:w-auto"
                >
                    <span className="text-lg">+</span> Add New Skills
                </button>

                <button
                    onClick={handleSave}
                    className="cursor-pointer mt-4 mb-4 p-2 bg-black text-white rounded-lg w-full sm:w-auto"
                >
                    Save Data
                </button>

                <ToastContainer />
            </div>
        </div>
    );
}

export default SkillsExperienceForm;
