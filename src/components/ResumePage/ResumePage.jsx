import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access the route parameter
import FormPage from './FormPage';
import ResumePreview from './ResumePreview';
import Dummy from '../Data/Dummy';
import { ResumeInfoContext } from '../Context/ResumeInfoContext';

function ResumePage() {
  const [resumeInfo, setResumeInfo] = useState();
  const { id } = useParams(); // Get the 'id' from the URL

  useEffect(() => {
    if (id) {
      // If 'id' exists, fetch the specific resume from localStorage
      const savedResumes = JSON.parse(localStorage.getItem('resumes')) || [];
      const resumeToEdit = savedResumes.find((resume, index) => index === parseInt(id));
      if (resumeToEdit) {
        setResumeInfo(resumeToEdit);
      }
    } else {
      // If no 'id', use the Dummy data (for creating a new resume)
      setResumeInfo(Dummy);
    }
  }, [id]); // Effect runs when the 'id' changes (or is undefined)

  return (
    <>
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-full mx-auto mt-30 px-4">
          {/* FormSection */}
          <div className="w-full">
            <FormPage />
          </div>

          {/* Resume Section */}
          <div className="w-full">
            <ResumePreview />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    </>
  );
}

export default ResumePage;
