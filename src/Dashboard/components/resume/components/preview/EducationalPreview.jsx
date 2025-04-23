const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-xl mb-2 "
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {/* ✅ FIXED: Changed from resumeInfo.education to resumeInfo.educationDetail */}
      {(Array.isArray(resumeInfo?.educationDetail) ? resumeInfo.educationDetail : []).map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-lg font-bold' style={{ color: resumeInfo?.themeColor }}>
            {education.universityName}
          </h2>
          <h2 className='text-md flex justify-between '>
            {education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
          </h2>
          <p className='my-2 text-md'>
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;
