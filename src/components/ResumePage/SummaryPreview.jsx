import React from 'react'

function SummaryPreview({resumeInfo}) {
    return (
        <>
            <p className='text-xs mb-2'>{resumeInfo?.summary}</p>
            <h2 className='test-sm font-medium text-center'  style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
            <hr className='border-[1.5px] my-2' style={{color:resumeInfo?.themeColor}} />
        </>
    )
}

export default SummaryPreview