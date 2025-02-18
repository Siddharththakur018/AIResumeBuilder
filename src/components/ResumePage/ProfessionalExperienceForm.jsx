import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';

function ProfessionalExperienceForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [experiences, setExperiences] = useState(resumeInfo.professionalExperience || []);

    useEffect(() => {
        const savedData = localStorage.getItem('resumeInfo');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setResumeInfo({
                ...parsedData,
                professionalExperience: Array.isArray(parsedData.professionalExperience)
                    ? parsedData.professionalExperience
                    : [],
            });
            setExperiences(parsedData.professionalExperience || []);
        } else {
            setResumeInfo({
                professionalExperience: [],
                personalDetails: {},
            });
            setExperiences([]);
        }
    }, []);

    const handleInputChange = (e, index, updatedResponsibilities = null) => {
        const { name, value } = e.target;
        const updatedExperiences = experiences.map((exp, i) =>
            i === index
                ? { ...exp, [name]: updatedResponsibilities || value }
                : exp
        );
        setExperiences(updatedExperiences);
    };

    const addNewExperience = () => {
        setExperiences([
            ...experiences,
            { company: '', role: '', duration: '', responsibilities: [''] },
        ]);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setResumeInfo({
            ...resumeInfo,
            professionalExperience: experiences,
        });
        localStorage.setItem('resumeInfo', JSON.stringify({ ...resumeInfo, professionalExperience: experiences }));
        console.log('Data Saved');
    };

    const deleteExperience = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white max-w-full sm:max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
            <p className="text-sm text-gray-600">Update your professional experience below</p>

            {experiences.map((exp, index) => (
                <div key={index} className="mt-4">
                    <form onSubmit={handleSave} className="space-y-4 mt-3">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your company name"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={exp.role}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter your job title"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={exp.duration}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Enter the duration"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Responsibilities</label>
                            <textarea
                                name="responsibilities"
                                value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : ''} // Display each responsibility on a new line
                                onChange={(e) => {
                                    const updatedResponsibilities = e.target.value.split('\n'); // Split the input text into an array
                                    handleInputChange(e, index, updatedResponsibilities); // Pass the updated array to handleInputChange
                                }}
                                placeholder="Enter your responsibilities"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                            />
                        </div>

                        <div className="flex space-x-3 mt-3">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-black text-white font-semibold py-2 rounded-lg shadow-md border border-primary"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteExperience(index)}
                                className="w-full sm:w-auto bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md border border-primary"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            ))}

            <button
                onClick={addNewExperience}
                className="cursor-pointer mt-4 mb-4 p-2 bg-black text-white rounded-lg w-full sm:w-auto"
            >
                <span className="text-lg">+</span> Add New Experience
            </button>
        </div>
    );
}

export default ProfessionalExperienceForm;
