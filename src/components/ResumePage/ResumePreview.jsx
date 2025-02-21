import React, { useContext, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeInfoContext } from "../Context/ResumeInfoContext";
import PersonalDetails from "./PersonalDetails";
import SummaryPreview from "./SummaryPreview";
import ProfessionalExperience from "./ProfessionalExperience";
import Education from "./Education";
import Skills from "./Skills";

function ResumePreview() {

  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeRef = useRef(); // Reference for capturing the resume

  // Function to Download Resume as PDF
  const downloadResume = async () => {
    const resumeElement = resumeRef.current;

    // Ensure unsupported CSS properties do not break rendering
    resumeElement.querySelectorAll("*").forEach((el) => {
      const computedStyle = getComputedStyle(el);
      if (
        computedStyle.backgroundColor.includes("oklch") || 
        computedStyle.color.includes("oklch") || 
        computedStyle.borderColor.includes("oklch")
      ) {
        el.style.backgroundColor = "transparent";  // Replace with transparent
        el.style.color = "#000"; // Default to black
        el.style.borderColor = "transparent";
      }
    });

    try {
      const canvas = await html2canvas(resumeElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      let yPosition = 0;
      const pageHeight = 297; // A4 height in mm

      // Handle multi-page PDFs if the image exceeds a single page
      while (yPosition < imgHeight) {
        pdf.addImage(imgData, "PNG", 0, yPosition * -1, imgWidth, imgHeight);
        yPosition += pageHeight;
        if (yPosition < imgHeight) pdf.addPage();
      }

      pdf.save("My_Resume.pdf"); // Download the PDF
    } catch (error) {
      console.error("Error generating resume PDF:", error);
    }
  };

  return (
    <>
    <div 
      ref={resumeRef} 
      className="shadow-lg p-4 sm:p-6 md:p-10 lg:p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Resume Sections */}
      <div className="mb-6 sm:mb-8 md:mb-10"><PersonalDetails resumeInfo={resumeInfo} /></div>
      <div className="mb-6 sm:mb-8 md:mb-10"><SummaryPreview resumeInfo={resumeInfo} /></div>
      <div className="mb-6 sm:mb-8 md:mb-10"><ProfessionalExperience resumeInfo={resumeInfo} /></div>
      <div className="mb-6 sm:mb-8 md:mb-10"><Education resumeInfo={resumeInfo} /></div>
      <div className="mb-6 sm:mb-8 md:mb-10"><Skills resumeInfo={resumeInfo} /></div>

      {/* Download Button */}
      
    </div>
    <button 
        onClick={downloadResume} 
        className="bg-blue-600 text-white px-4 py-2 mt-5 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Download Resume
      </button>
    </>
  );
}

export default ResumePreview;
