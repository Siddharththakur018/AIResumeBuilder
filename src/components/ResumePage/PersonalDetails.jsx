import React from 'react';

function PersonalDetails({ resumeInfo }) {
  return (
    <>
      <h2 
        className="font-bold text-xl text-center" 
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.personalDetails.name}
      </h2>
      <h2 
        className="text-sm text-center font-medium" 
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.personalDetails.jobTitle}
      </h2>
      <h2 
        className="text-sm text-center font-medium" 
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.personalDetails.location}
      </h2>

      <div 
        className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8" 
        style={{ color: resumeInfo?.themeColor }}
      >
        <h2 className="sm:flex-1">{resumeInfo?.personalDetails.phone}</h2>
        <h2 className="sm:flex-1">{resumeInfo?.personalDetails.email}</h2>
      </div>

      <div 
        className="flex flex-col sm:flex-row justify-between mb-2 gap-2 sm:gap-4" 
        style={{ color: resumeInfo?.themeColor }}
      >
        <h2 className="text-xs sm:text-sm">{resumeInfo?.personalDetails.linkedin}</h2>
        <h2 className="text-xs sm:text-sm">{resumeInfo?.personalDetails.github}</h2>
      </div>

      <h2 
        className="text-sm font-medium text-center" 
        style={{ color: resumeInfo?.themeColor }}
      >
        Summary
      </h2>
      <hr 
        className="border-[1.5px] my-2" 
        style={{ color: resumeInfo?.themeColor }}
      />
    </>
  );
}

export default PersonalDetails;
