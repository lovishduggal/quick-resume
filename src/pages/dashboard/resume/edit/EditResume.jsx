import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InputForm from '../components/InputForm';
import PreviewForm from '../components/preview-form/PreviewForm';
import ResumeDataContext from '../../../../context/ResumeDataContext';
import { formDummyData } from '../../../../constants';

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    setResumeData(formDummyData);
  }, []);
  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      {Object.keys(resumeData).length > 0 && (
        <div className="max-w-screen-lg lg:mx-auto py-4 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputForm />
          <PreviewForm />
        </div>
      )}
    </ResumeDataContext.Provider>
  );
};

export default EditResume;
