import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';
import Dummy from '../Data/Dummy';

function SummaryDetailsForm() {
    const GEMINI_API_KEY = 'AIzaSyAp2npRnRiviJpxeawCAjCDJ7SCUqD-f38';
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);
    const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('resumeInfo');
        if (savedData) {
            setResumeInfo(JSON.parse(savedData));
        }
    }, [setResumeInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const onSave = (e) => {
        e.preventDefault();
        if (JSON.stringify(resumeInfo) !== JSON.stringify(Dummy)) {
            localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo));
        }
        console.log('Data Saved');
    };

    const generateSummary = async () => {
        const jobTitle = resumeInfo?.personalDetails?.jobTitle;
        if (!jobTitle) {
            alert("Please provide a job title.");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        const prompt = `Write three professional summary options for a resume for a ${jobTitle} position.`;
    
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
                }
            );
    
            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
    
            if (data && data.candidates && data.candidates.length > 0) {
                const summaryText = data.candidates[0]?.content?.parts[0]?.text || "";
                const summaryArray = summaryText.split("\n\n").slice(0, 3);
                setSummaries(summaryArray);
            } else {
                throw new Error('No valid summary text received from API.');
            }
        } catch (err) {
            setError('Failed to generate summary. Please try again.');
            console.error('Error generating summary:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white max-w-full sm:max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Summary Details</h2>
            <p className="text-sm text-gray-600 mb-4">Provide a brief summary to describe your profile</p>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <label className="text-sm font-medium text-gray-700">Add Summary</label>
                    <button 
                        className="bg-fuchsia-600 text-white cursor-pointer px-4 py-2 mt-2 sm:mt-0 rounded-lg text-sm font-medium shadow-md hover:bg-primary-dark transition-all duration-200"
                        onClick={generateSummary}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate from AI'}
                    </button>
                </div>

                <div className="mt-3">
                    <textarea
                        rows="5"
                        required
                        value={resumeInfo?.summary || ''}
                        onChange={handleInputChange}
                        name="summary"
                        placeholder="Write your summary here..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button onClick={onSave} className="w-[100px] mt-3 bg-black text-white font-semibold py-2 rounded-lg shadow-md border border-primary">
                    Save
                </button>
            </div>

            {summaries.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Generated Summaries</h3>
                    {summaries.map((summary, index) => (
                        <textarea
                            key={index}
                            rows="4"
                            value={summary}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
                            readOnly
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SummaryDetailsForm;
