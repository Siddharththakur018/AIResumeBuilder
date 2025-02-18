import React, { useContext, useEffect } from 'react';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';
import Dummy from '../Data/Dummy';

function PersonalDetailsForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        const savedData = localStorage.getItem('resumeInfo');
        if (savedData) {
            setResumeInfo(JSON.parse(savedData));
        } else {
            // Ensure the default data structure is set
            setResumeInfo(Dummy); 
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setResumeInfo((prevState) => ({
            ...prevState,
            personalDetails: {
                ...prevState.personalDetails,
                [name]: value,
            },
        }));
    };

    const onSave = (e) => {
        e.preventDefault();

        // Save the updated data to localStorage on every change
        localStorage.setItem("resumeInfo", JSON.stringify(resumeInfo));
        console.log('Data Saved');
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
            <p className="text-sm text-gray-600">Get started with basic information</p>

            <form onSubmit={onSave} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            value={resumeInfo?.personalDetails?.name || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            required
                            name="jobTitle"
                            value={resumeInfo?.personalDetails?.jobTitle || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your job title"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            required
                            name='phone'
                            value={resumeInfo?.personalDetails?.phone || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name='location'
                            required
                            value={resumeInfo?.personalDetails?.location || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            value={resumeInfo?.personalDetails?.email || ''}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">LinkedIn Profile</label>
                        <input
                            type="url"
                            name='linkedin'
                            onChange={handleInputChange}
                            value={resumeInfo?.personalDetails?.linkedin || ''}
                            placeholder="Enter LinkedIn URL"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700">GitHub Profile</label>
                        <input
                            type="url"
                            name='github'
                            value={resumeInfo?.personalDetails?.github || ''}
                            onChange={handleInputChange}
                            placeholder="Enter GitHub URL"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-primary"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full sm:w-[100px] mt-3 bg-black text-white font-semibold py-2 rounded-lg shadow-md border border-primary">
                    Save
                </button>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
