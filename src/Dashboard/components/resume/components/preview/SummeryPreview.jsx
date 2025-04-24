import React from 'react'

const SummeryPreview = ({resumeInfo}) => {
  return (
    <div>
      <p className='text-md'
      >{resumeInfo?.summery}</p>
    </div>
  )
}

export default SummeryPreview