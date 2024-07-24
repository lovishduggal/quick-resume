const EducationPreview = ({ resumeData }) => {
  return (
    <div className="my-6">
      {' '}
      <h2
        className={`text-center text-sm font-bold mb-2 text-[${resumeData?.themeColor}]`}
      >
        Education
      </h2>
      <hr className={`border-[${resumeData?.themeColor}] border-t-2 my-2`} />
      {Object.keys(resumeData).length > 0 &&
        resumeData?.education.map((education, idx) => (
          <div className="my-4" key={idx}>
            <h2
              className={`text-sm font-bold text-[${resumeData?.themeColor}]`}
            >
              {education.universityName}
            </h2>
            <h2 className="text-xs flex justify-between items-center">
              {education.degree} in {education.major}
              <span>
                {' '}
                {education.startDate} - {education.endDate}
              </span>
            </h2>
            <p className="text-xs my-2">{education.description}</p>
          </div>
        ))}
    </div>
  );
};

export default EducationPreview;
