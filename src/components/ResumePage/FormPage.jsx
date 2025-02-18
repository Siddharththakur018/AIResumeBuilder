import React, { useState } from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SummaryDetailsForm from './SummaryDetailsForm';
import ProfessionalExperienceForm from './ProfessionalExperienceForm';
import EducationExperienceForm from './EducationExperienceForm';
import SkillsExperienceForm from './SkillsExperienceForm';
import { Line } from 'rc-progress'; // Import the progress bar

function FormPage() {
  const [activeForm, setActiveForm] = useState(1);
  const totalForm = 5;

  const handleNext = () => {
    if (activeForm < totalForm) {   
      setActiveForm(activeForm + 1);
    }
  };

  const handlePrevious = () => {
    if (activeForm > 1) {
      setActiveForm(activeForm - 1);
    }
  };

  // Calculate progress as percentage
  const progress = ((activeForm - 1) / (totalForm - 1)) * 100;

  return (
    <>
      <div className="max-w-4xl mx-auto p-5">
        {/* Progress Bar */}
        <div className="mb-4 w-full max-w-[60%] ml-20">
          <Line 
            percent={progress} 
            strokeWidth="3" 
            strokeColor="#4CAF50" 
            trailColor="#d3d3d3" 
            trailWidth="2" 
            style={{ width: '100%' }} 
          />
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button className="hidden sm:block"></button>
          <div className="flex items-center justify-between gap-4 w-full sm:w-[150px]">
            {activeForm > 1 && (
              <button
                onClick={handlePrevious}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
              >
                <FaArrowLeft />
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex gap-2 items-center p-2 rounded-md bg-black text-white hover:bg-gray-800 transition-all"
              disabled={activeForm === totalForm} // Disable Next button on last form
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Render Active Form */}
        <div>
          {activeForm === 1 ? <PersonalDetailsForm /> :
            activeForm === 2 ? <SummaryDetailsForm /> :
            activeForm === 3 ? <ProfessionalExperienceForm /> :
            activeForm === 4 ? <EducationExperienceForm /> :
            activeForm === 5 ? <SkillsExperienceForm /> : null}
        </div>
      </div>
    </>
  );
}

export default FormPage;
