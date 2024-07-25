import { BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Textarea } from '../../../../../components/ui/textarea';
import ResumeDataContext from '../../../../../context/ResumeDataContext';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { updateResume } from '../../../../../http/api';
import { useParams } from 'react-router-dom';

const Summary = ({ setEnableNxtBtn }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { resumeId } = useParams();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSummary(e.target.value);
    setResumeData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedResumeData = {
        data: { summary },
      };

      await updateResume(resumeId, updatedResumeData);
      setEnableNxtBtn(true);
      toast('Summary Updated successfully!!', { type: 'success' });
    } catch (error) {
      console.error('Error updating resume:', error);
      toast('Error updating resume. Please try again.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg p-2 rounded-lg border-t-primary border-t-4">
      <h2 className="font-bold text-base">Summary</h2>
      <p className="text-sm font-medium">
        Brief summary of your experience and skills
      </p>
      <form onSubmit={handleSubmit} className="mt-7">
        <div className="flex flex-wrap justify-between items-center">
          <label className="font-medium">Add Summary</label>
          <Button
            className="fex  items-center gap-2 border-primary"
            variant="outline"
            size="sm"
          >
            <BrainCircuit size={'20px'} /> Generate with AI
          </Button>
        </div>
        <Textarea
          className="mt-4"
          onChange={handleInputChange}
          value={summary}
          required
        />
        <div className="flex justify-end  mt-2">
          <Button disabled={loading} type="submit" className="flex gap-1">
            {loading && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Summary;
