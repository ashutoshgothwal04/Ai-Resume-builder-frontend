// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import React, { useContext, useEffect, useState } from 'react'
// import RichTextEditor from '@/Dashboard/components/RichTextEditor'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../../../services/GlobleApi'
// import { toast } from 'sonner'
// import { LoaderCircle } from 'lucide-react'

// const formField={
//     title:'',
//     companyName:'',
//     city:'',
//     state:'',
//     startDate:'',
//     endDate:'',
//     workSummery:'',

// }
// function Experience() {
//     const [experinceList,setExperinceList]=useState([]);
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
//     const params=useParams();
//     const [loading,setLoading]=useState(false);

//     useEffect(()=>{
//         resumeInfo?.Experience.length>0&&setExperinceList(resumeInfo?.Experience)
        
//     },[])

//     const handleChange=(index,event)=>{
//         const newEntries=experinceList.slice();
//         const {name,value}=event.target;
//         newEntries[index][name]=value;
//         console.log(newEntries)
//         setExperinceList(newEntries);
//     }

//     const AddNewExperience=()=>{
    
//         setExperinceList([...experinceList,{
//             title:'',
//             companyName:'',
//             city:'',
//             state:'',
//             startDate:'',
//             endDate:'',
//             workSummery:'',
//         }])
//     }

//     const RemoveExperience=()=>{
//         setExperinceList(experinceList=>experinceList.slice(0,-1))
//     }

//     const handleRichTextEditor=(e,name,index)=>{
//         const newEntries=experinceList.slice();
//         newEntries[index][name]=e.target.value;
       
//         setExperinceList(newEntries);
//     }

//     useEffect(()=>{
//         setResumeInfo({
//             ...resumeInfo,
//             Experience:experinceList
//         });
     
//     },[experinceList]);


//     const onSave=()=>{
//         setLoading(true)
//         const data={
//             data:{
//                 Experience:experinceList.map(({ id, ...rest }) => rest)
//             }
//         }

//          console.log(experinceList)

//         GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
//             console.log(res);
//             setLoading(false);
//             toast('Details updated !')
//         },(error)=>{
//             setLoading(false);
//         })

//     }
//   return (
//     <div>
//         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Professional Experience</h2>
//         <p>Add Your previous Job experience</p>
//         <div>
//             {experinceList.map((item,index)=>(
//                 <div key={index}>
//                     <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
//                         <div>
//                             <label className='text-xs'>Position Title</label>
//                             <Input name="title" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.title}
//                             />
//                         </div>
//                         <div>
//                             <label className='text-xs'>Company Name</label>
//                             <Input name="companyName" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.companyName} />
//                         </div>
//                         <div>
//                             <label className='text-xs'>City</label>
//                             <Input name="city" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.city}/>
//                         </div>
//                         <div>
//                             <label className='text-xs'>State</label>
//                             <Input name="state" 
//                             onChange={(event)=>handleChange(index,event)}
//                             defaultValue={item?.state}
//                              />
//                         </div>
//                         <div>
//                             <label className='text-xs'>Start Date</label>
//                             <Input type="date"  
//                             name="startDate" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.startDate}/>
//                         </div>
//                         <div>
//                             <label className='text-xs'>End Date</label>
//                             <Input type="date" name="endDate" 
//                             onChange={(event)=>handleChange(index,event)} 
//                             defaultValue={item?.endDate}
//                             />
//                         </div>
//                         <div className='col-span-2'>
//                            {/* Work Summery  */}
//                            <RichTextEditor
//                            index={index}
//                            defaultValue={item?.workSummery}
//                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         <div className='flex justify-between'>
//             <div className='flex gap-2'>
//             <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
//             <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

//             </div>
//             <Button disabled={loading} onClick={()=>onSave()}>
//             {loading?<LoaderCircle className='animate-spin' />:'Save'}    
//             </Button>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Experience

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import RichTextEditor from "@/Dashboard/components/RichTextEditor";
import { PlusIcon, Trash2Icon, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState, useCallback } from "react";
import GlobleApi from "./../../../../../../services/GlobleApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const emptyField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
  currentlyWorking: false
};

const Experience = () => {
  const [experienceList, setExperienceList] = useState([{...emptyField}]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // Initialize from resumeInfo (only on mount)
  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, []);

  const handleChange = useCallback((index, event) => {
    const { name, value, type, checked } = event.target;
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index][name] = type === 'checkbox' ? checked : value;
      return updated;
    });
  }, []);

  const handleRichTextChange = useCallback((value, index) => {
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index].workSummery = value;
      return updated;
    });
  }, []);

  const addMoreExperience = useCallback(() => {
    setExperienceList(prev => [...prev, { ...emptyField }]);
  }, []);

  const removeExperience = useCallback(() => {
    if (experienceList.length > 1) {
      setExperienceList(prev => prev.slice(0, -1));
    }
  }, [experienceList.length]);

  // Update context only when experienceList changes
  useEffect(() => {
    if (JSON.stringify(resumeInfo?.Experience) !== JSON.stringify(experienceList)) {
      setResumeInfo(prev => ({
        ...prev,
        Experience: experienceList
      }));
    }
  }, [experienceList, resumeInfo?.Experience, setResumeInfo]);

  const onSave = useCallback(() => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest)
      }
    };

    GlobleApi.UpdateResumeDetail(data, params?.resumeId)
      .then(() => {
        setLoading(false);
        toast.success("Details updated!");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, [experienceList, params?.resumeId]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      <div>
        {experienceList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-sm">Position Title</label>
              <Input
                name="title"
                value={item.title || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-sm">Company Name</label>
              <Input
                name="companyName"
                value={item.companyName || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-sm">City</label>
              <Input
                name="city"
                value={item.city || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-sm">State</label>
              <Input
                name="state"
                value={item.state || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-xs">Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={item.startDate || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-xs">End Date</label>
              <Input
                type="date"
                name="endDate"
                value={item.endDate || ''}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={item.currentlyWorking || false}
                onChange={(e) => handleChange(index, e)}
              />
              <label className="text-sm">Currently working here</label>
            </div>
            <div className="col-span-2">
              <RichTextEditor
                value={item.workSummery || ''}
                onChange={handleRichTextChange}
                index={index}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={addMoreExperience}
            variant="outline"
            className="text-primary border-primary"
          >
            <PlusIcon /> Add More Experience
          </Button>
          <Button
            onClick={removeExperience}
            variant="outline"
            className="text-primary border-primary"
          >
            <Trash2Icon className="text-red-600" /> Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Experience;