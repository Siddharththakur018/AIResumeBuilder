import React from 'react';

function Skills({ resumeInfo }) {
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 text-xs mt-2'>
                {resumeInfo?.skills?.map((skill, index) => (
                    <div key={index} className='items-center justify-between m-1 md:flex md:justify-between'>
                        <p className="truncate">{skill.name}</p> 
                        <div className='h-2 bg-gray-200 w-full sm:w-[120px]'>
                            <div
                                className='h-2'
                                style={{
                                    backgroundColor: resumeInfo?.themeColor,
                                    width: skill?.percentage + '%'
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;
