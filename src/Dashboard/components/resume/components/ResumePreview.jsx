import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'

const ResumePreview = () => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] '
    style={{ borderColor: resumeInfo?.themeColor }}
    >

      {/* personal details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* summary */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* profational experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* projects */}
      <ProjectsPreview resumeInfo={resumeInfo} />

      {/* education */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo} />


    </div>
  )
}

export default ResumePreview
