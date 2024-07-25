import { useContext, useState } from 'react';
import ResumeDataContext from '../../../../../context/ResumeDataContext';
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { useParams } from 'react-router-dom';
import { updateResume } from '../../../../../http/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

//TODO:
//? On refresh page, we have to persist the entered data in preview form

const PersonalDetails = ({ setEnableNxtBtn }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { resumeId } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setResumeData((prev) => ({ ...prev, [name]: value }));
    setEnableNxtBtn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedResumeData = {
        data: formData,
      };

      await updateResume(resumeId, updatedResumeData);
      setEnableNxtBtn(true);
      toast('Details Updated successfully!!');
    } catch (error) {
      console.error('Error updating resume:', error);
      toast('Error updating resume. Please try again.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg p-2 rounded-lg border-t-primary border-t-4">
      <h2 className="font-bold text-base">Personal Details</h2>
      <p className="text-sm font-medium">
        Get started with your personal details
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-1 mt-5 gap-4">
          {[
            'firstName',
            'lastName',
            'jobTitle',
            'address',
            'phone',
            'email',
          ].map((fieldName) => (
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
              <Input
                type={fieldName === 'email' ? 'email' : 'text'}
                name={fieldName}
                defaultValue={resumeData[fieldName]}
                required
                onChange={handleInputChange}
                pattern={fieldName === 'phone' ? '[0-9]{10}' : undefined}
              />
            </div>
          ))}
          <div className="col-span-2 md:col-span-1 flex justify-end">
            <Button type="submit" disabled={loading} className="flex gap-1">
              {loading && <Loader2 className="animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
