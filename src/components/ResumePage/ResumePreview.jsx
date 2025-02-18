import React, { useContext } from 'react';
import PersonalDetails from './PersonalDetails';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';
import SummaryPreview from './SummaryPreview';
import ProfessionalExperience from './ProfessionalExperience';
import Education from './Education';
import Skills from './Skills';

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  
  return (
    <div 
      className="shadow-lg p-4 sm:p-6 md:p-10 lg:p-14 border-t-[20px]" 
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Details */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <PersonalDetails resumeInfo={resumeInfo} />
      </div>

      {/* Summary Details */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <SummaryPreview resumeInfo={resumeInfo} />
      </div>

      {/* Professional Experience */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <ProfessionalExperience resumeInfo={resumeInfo} />
      </div>

      {/* Educational Details */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Education resumeInfo={resumeInfo} />
      </div>

      {/* Skills Details */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Skills resumeInfo={resumeInfo} />
      </div>
    </div>
  );
}

export default ResumePreview;
