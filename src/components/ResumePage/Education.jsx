import React from 'react'

function Education({resumeInfo}) {
  return (
    <>
        <div className='text-xs mb-2'>
            <div>
                {
                    resumeInfo?.education?.map((education, index) => {
                        return(
                            <div key={index} className='mb-4'>
                                <p style={{color:resumeInfo?.themeColor}} className='text-lg font-semibold'>{education.university}</p>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                    <p>{education.degree}</p>
                                    <p><strong>Duration: </strong>{education.duration}</p>
                                </div>                                 
                                <p><strong>CGPA: </strong>{education.cgpa}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <h2 style={{color:resumeInfo?.themeColor}} className='text-sm font-medium text-center mt-6 mb-4'>Skills</h2>
        <hr className='border-t-[1.2px]' style={{borderColor:resumeInfo?.themeColor}} />
    </>
  )
}

export default Education;
