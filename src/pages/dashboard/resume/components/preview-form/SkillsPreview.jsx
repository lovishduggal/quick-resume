const SkillsPreview = ({ resumeData }) => {
  return (
    <div className="my-6">
      {' '}
      <h2
        className={`text-center text-sm font-bold mb-2 text-[${resumeData?.themeColor}] `}
      >
        Skills
      </h2>
      <hr className={`border-[${resumeData?.themeColor}] border-t-2 my-2`} />
      <div className="grid grid-cols-2 gap-x-16">
        {Object.keys(resumeData).length > 0 &&
          resumeData?.skills.map((skill, idx) => (
            <div
              className="my-4 flex justify-between items-center
          "
              key={idx}
            >
              <h2 className={`text-sm font-bold`}>{skill.name}</h2>
              <div className="h-2 bg-gray-200 w-32">
                <div
                  className={`w-[${skill?.rating}%] h-2 bg-[${resumeData?.themeColor}]`}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
