import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobleApi from '../.././services/GlobleApi';
import ResumeCardItem from './components/ResumeCardItem.jsx';


const Dashboard = () => {

  const {user} = useUser();
  const [resumeList, setResumeList] = useState([])

  useEffect(()=>{
    user&&GetResumesList();
  },[user])

 // use to get users resume list
  const GetResumesList = () => {
    GlobleApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp=>{
      // console.log(resp.data);
      setResumeList(resp.data.data);
    })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32' >
      <h1 className='font-bold text-3xl'>My Resume</h1>
      <p>Start creating AI resume to your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 border-dashed gap-5
      '>
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume, index) =>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
