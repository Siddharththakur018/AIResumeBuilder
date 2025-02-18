import { jsPDF } from 'jspdf';
import { useEffect, useRef, useState } from 'react';  // Import useRef
import { useNavigate } from 'react-router-dom';

function CardPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the index of selected card
  const navigate = useNavigate();

  // Reference for the ResumePreview content
  const resumePreviewRef = useRef();

  useEffect(() => {
    // Retrieve all saved resumes from localStorage (if any)
    const savedResumes = JSON.parse(localStorage.getItem('resumes')) || [];
    setResumes(savedResumes);
  }, []);

  const handleCardClick = (index) => {
    if (selectedIndex === index) {
      navigate(`/resume/${index}`);
    } else {
      setSelectedIndex(index); // Show delete and download button when the card is clicked
    }
  };

  const handleCreateNewResume = () => {
    navigate('/resume');
  };

  // Handle download of resume as PDF
  const handleDownload = (index, event) => {
    event.stopPropagation(); // Prevent the card click event (navigation)

    const resume = resumes[index];  // Get the selected resume

    // Generate PDF from the resume preview content
    const doc = new jsPDF();
    doc.html(resumePreviewRef.current, {
      callback: function (doc) {
        doc.save(`${resume.personalDetails.name}_Resume.pdf`); // Save PDF with the name of the resume
      },
      x: 10,
      y: 10,
    });
  };

  // Handle delete of resume
  const handleDelete = (index, event) => {
    event.stopPropagation(); // Prevent the card click event (navigation)

    // Remove the selected resume from localStorage and update state
    const updatedResumes = resumes.filter((_, i) => i !== index);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
    setSelectedIndex(null); // Reset the selected index after deletion
  };

  return (
    <div className="mt-24 px-6 lg:px-24">
      <h1 className="text-4xl font-semibold text-center text-gray-900">My Resumes</h1>
      <h2 className="text-xl text-center text-gray-600 mb-8">Click a resume to edit or create a new one</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              onClick={() => handleCardClick(index)}
            >
              <h3 className="text-2xl font-semibold text-gray-800">{resume.personalDetails.name}</h3>
              <p className="text-gray-600 mt-2">{resume.summary}</p>

              {/* Card Content */}
              <div className="mt-4">
                {/* Delete and Download Buttons */}
                {selectedIndex === index && (
                  <div className="flex justify-between gap-4">
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDelete(index, e)}  // Handle delete
                      className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-200 w-full"
                    >
                      Delete
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={(e) => handleDownload(index, e)}  // Trigger download of the resume preview as PDF
                      className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 w-full"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No resumes found</p>
        )}

        {/* Card to create a new resume */}
        <div
          className="bg-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl text-white cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={handleCreateNewResume}
        >
          <h3 className="text-2xl font-semibold">Create New Resume</h3>
          <p>Click here to create a new resume</p>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
