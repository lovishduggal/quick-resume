import { useContext } from 'react';
import ResumeDataContext from '../../../../context/ResumeDataContext';
import PersonalDetailPreview from './preview-form/PersonalDetailPreview';
import SummeryPreview from './preview-form/SummeryPreview';
import ExperiencePreview from './preview-form/ExperiencePreview';
import EducationPreview from './preview-form/EducationPreview';
import SkillsPreview from './preview-form/SkillsPreview';

const PreviewForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  return (
    <div
      className="col-span-2 shadow-lg h-full p-4 border-t-8"
      style={{ borderColor: resumeData?.themeColor }}
    >
      {/* Personal detail */}
      <PersonalDetailPreview resumeData={resumeData} />
      {/* Summary */}
      <SummeryPreview resumeData={resumeData} />
      {/* Experience */}
      <ExperiencePreview resumeData={resumeData} />
      {/* Education */}
      <EducationPreview resumeData={resumeData} />
      {/* Skills */}
      <SkillsPreview resumeData={resumeData} />
    </div>
  );
};

export default PreviewForm;
