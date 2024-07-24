const PersonalDetailPreview = ({ resumeData }) => {
  return (
    <div className="text-center">
      <h2
        className="text-xl font-bold"
        style={{ color: resumeData?.themeColor }}
      >
        {resumeData?.firstName} {resumeData?.lastName}
      </h2>

      <h2 className="text-sm font-medium">{resumeData?.jobTitle}</h2>

      <h2
        className="font-normal text-xs"
        style={{ color: resumeData?.themeColor }}
      >
        {resumeData?.address}
      </h2>

      <div
        className="flex justify-between items-center"
        style={{ color: resumeData?.themeColor }}
      >
        <h2>{resumeData?.phone}</h2>
        <h2>{resumeData?.email}</h2>
      </div>

      <hr
        className="border-t-2 my-2"
        style={{ borderColor: resumeData?.themeColor }}
      />
    </div>
  );
};

export default PersonalDetailPreview;
