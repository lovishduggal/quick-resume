import { useContext, useState } from 'react';
import { Input } from '../../../../../components/ui/input';
import ResumeDataContext from '../../../../../context/ResumeDataContext';
import { Button } from '../../../../../components/ui/button';
import { Plus } from 'lucide-react';
import TextEditor from '../TextEditor';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
};

const Experience = () => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const [experienceList, setExperienceList] = useState([]);

  const handleInputChange = (e) => {};

  return (
    <div className="shadow-lg p-2 rounded-lg border-t-primary border-t-4">
      <h2 className="font-bold text-base">Experience</h2>
      <p className="text-sm font-medium">Add you recent work experience</p>
      <form>
        <div className="grid grid-cols-1  mt-5 gap-4">
          {[
            'title',
            'companyName',
            'city',
            'state',
            'startDate',
            'endDate',
            'workSummery',
          ].map((fieldName) => {
            return (
              <div key={fieldName}>
                <label
                  htmlFor={fieldName}
                  className="block text-sm font-medium mb-1"
                >
                  {fieldName
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </label>
                {fieldName !== 'workSummery' ? (
                  <Input
                    className="w-full"
                    type={
                      fieldName === 'startDate'
                        ? 'date'
                        : fieldName === 'endDate'
                        ? 'date'
                        : 'text'
                    }
                    name={fieldName}
                    defaultValue={resumeData[fieldName]}
                    required
                    onChange={handleInputChange}
                  />
                ) : (
                  <TextEditor />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" className="text-primary">
            <Plus /> Add Experience
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default Experience;
