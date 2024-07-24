const ExperiencePreview = ({ resumeData }) => {
  //   console.log(resumeData?.themeColor);
  return (
    <div className="my-6">
      <h2
        className={`text-center text-sm font-bold mb-2 text-[${resumeData?.themeColor}] `}
      >
        Experience
      </h2>
      <hr className={`border-[${resumeData?.themeColor}] border-t-2 my-2`} />
      {Object.keys(resumeData).length > 0 &&
        resumeData?.experience.map((experience, idx) => (
          <div className="my-4" key={idx}>
            <h2
              className={`text-sm font-bold text-[${resumeData?.themeColor}]`}
            >
              {experience.title}
            </h2>
            <h2 className="text-xs flex justify-between items-center">
              {experience.companyName},{experience.city}, {experience.state}
              <span>
                {' '}
                {experience.startDate} -{' '}
                {experience?.currentlyWorking ? 'Present' : experience.endDate}
              </span>
            </h2>
            <p className="text-xs my-2">{experience.workSummery}</p>
          </div>
        ))}
    </div>
  );
};

export default ExperiencePreview;
