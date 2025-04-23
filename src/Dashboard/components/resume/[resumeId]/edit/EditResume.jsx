import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobleApi from './../../../../../../services/GlobleApi';


function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {
    //  setResumeInfo(dummy)
    GetResumeInfo();
  }, [])


  const GetResumeInfo = () => {
    GlobleApi.GetResumeById(resumeId)
      .then(resp => {
        console.log("Fetched resume:", resp.data.data); // 👈 Add this
        setResumeInfo(resp.data.data);
      });
  };


  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
        <FormSection />
        {/* Preview Section  */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume



