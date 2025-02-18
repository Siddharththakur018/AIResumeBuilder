import React from 'react'

function ProfessionalExperience({ resumeInfo }) {
  return (
    <>
      <div className='mb-4'>
        <div>
          {
            resumeInfo?.professionalExperience?.map((experience, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className='flex justify-between items-start flex-col sm:flex-row'>
                    <p className='text-sm font-medium text-gray-700'>{experience.company}</p>
                    <p className='text-sm font-medium text-gray-700 mt-1 sm:mt-0'>{experience.role}</p>
                  </div>
                  <p className='text-xs text-gray-600'>{experience.duration}</p>
                  <p className='text-xs text-gray-600'>{experience.responsibilities}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <h2
        style={{ color: resumeInfo?.themeColor }}
        className='text-sm font-medium text-center mt-4'>
        Education
      </h2>
      <hr
        className='border-[1.5px] my-2'
        style={{ color: resumeInfo?.themeColor }}
      />
    </>
  )
}

export default ProfessionalExperience
