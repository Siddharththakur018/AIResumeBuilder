import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';

function EducationExperienceForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [education, setEducation] = useState(resumeInfo.education || []);

    useEffect(() => {
        const savedData = localStorage.getItem('resumeInfo');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setResumeInfo({
                ...parsedData,
                education: Array.isArray(parsedData.education)
                    ? parsedData.education
                    : [],
            });
            setEducation(parsedData.education || []);
        } else {
            setResumeInfo({
                education: [],
                personalDetails: {},
            });
            setEducation([]);
        }
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEducation = education.map((edu, i) =>
            i === index ? { ...edu, [name]: value } : edu
        );
        setEducation(updatedEducation);
    };

    const addNewEducation = () => {
        setEducation([
            ...education,
            { degree: '', university: '', duration: '', cgpa: '' },
        ]);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setResumeInfo({
            ...resumeInfo,
            education: education,
        });
        localStorage.setItem('resumeInfo', JSON.stringify({ ...resumeInfo, education: education }));
        console.log('Data Saved');
    };

    const deleteEducation = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        setEducation(updatedEducation);
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">Education Experience</h2>
            <p className="text-sm text-gray-600">Update your education experience below</p>

            {education.map((edu, index) => (
                <div key={index} className="mt-4">
                    <form onSubmit={handleSave} className="space-y-4 mt-3">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your degree"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">University</label>
                            <input
                                type="text"
                                name="university"
                                value={edu.university}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your university name"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={edu.duration}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter the duration"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">CGPA</label>
                            <input
                                type="text"
                                name="cgpa"
                                value={edu.cgpa}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your CGPA"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>

                        <div className="flex justify-between mt-3">
                            <button
                                type="submit"
                                className="cursor-pointer w-full sm:w-[100px] bg-black text-white font-semibold py-2 rounded-lg shadow-md border border-primary"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteEducation(index)}
                                className="w-full sm:w-20 mt-3 sm:ml-3 bg-black text-white font-semibold p-2 rounded-lg shadow-md border border-primary"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            ))}
            <button
                onClick={addNewEducation}
                className="cursor-pointer mt-4 mb-4 w-full sm:w-auto p-2 bg-black text-white rounded-lg"
            >
                <span className="text-lg">+</span> Add New Education
            </button>
        </div>
    );
}

export default EducationExperienceForm;
