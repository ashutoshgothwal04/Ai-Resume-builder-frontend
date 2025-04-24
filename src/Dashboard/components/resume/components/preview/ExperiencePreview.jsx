// import React from "react";

// const ExperiencePreview = ({ resumeInfo }) => {
//   return (
//     <div className="my-6">
//       <h2
//         className="text-center font-bold text-xl mb-2 "
//         style={{
//           color: resumeInfo?.themeColor,
//         }}
//       >
//         Professional Experience
//       </h2>

//       <hr
//         style={{
//           borderColor: resumeInfo?.themeColor,
//         }}
//       />

//       {resumeInfo?.experience?.map((experience, index) => (
//         <div key={index} className="my-5">
//           <h2 className="text-lg font-bold"
//            style={{
//             color: resumeInfo?.themeColor,
//           }}
//           >{experience?.title}</h2>
//           <h2 className="text-md flex justify-between " >
//             {experience?.companyName},{experience?.city},{experience?.state}
//             <span className="text-md">
//               {experience?.startDate} -{" "}
//               {experience?.currentlyWorking ? "Present" : experience?.endDate}
//             </span>
//           </h2>

//           {/* <p className="text-md my-2">
//             {experience?.workSummery}
//           </p> */}

//               <div dangerouslySetInnerHTML={{__html:experience?.workSummery}}/>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ExperiencePreview;



import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return dateString;
  }
};

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-xl mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Experience?.map((exp, index) => (
        <div key={index} className="my-5">
          <div className="flex justify-between items-baseline">
            <h3 
              className="text-lg font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {exp?.title}
            </h3>
            <span className="text-sm">
              {formatDate(exp?.startDate)} - {exp?.currentlyWorking ? 'Present' : formatDate(exp?.endDate)}
            </span>
          </div>
          
          <div className="text-sm mb-1">
            {[exp?.companyName, exp?.city, exp?.state].filter(Boolean).join(', ')}
          </div>

          {exp?.workSummery && (
            <div 
              className="text-sm mt-2"
              dangerouslySetInnerHTML={{ __html: exp.workSummery }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview