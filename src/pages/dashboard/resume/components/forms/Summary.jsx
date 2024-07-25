import { BrainCircuit, Check, ClipboardCopy, Loader2 } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Textarea } from '../../../../../components/ui/textarea';
import ResumeDataContext from '../../../../../context/ResumeDataContext';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { updateResume } from '../../../../../http/api';
import { useParams } from 'react-router-dom';
import { aiChatSession } from '../../../../../services/generativeAi';
import { getPrompt } from '../../../../../lib/utils';

//TODO:
//? Optimization and refactoring is pending!!
const Summary = ({ setEnableNxtBtn }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { resumeId } = useParams();
  const [summary, setSummary] = useState('');
  const [generatedSummaryList, setGeneratedSummaryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleInputChange = (e) => {
    setSummary(e.target.value);
    setResumeData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleCopyToClipboard = (summary, idx) => {
    navigator.clipboard.writeText(summary);
    setCopiedIdx(idx);
    setTimeout(() => {
      setCopiedIdx(null);
    }, 2000);
  };

  const handleGenerate = async () => {
    setLoadingGenerate(true);
    const prompt = getPrompt(resumeData?.jobTitle);
    const result = await aiChatSession.sendMessage(prompt);
    setGeneratedSummaryList(JSON.parse(result.response.text()));
    setLoadingGenerate(false);
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
      <p className="text-sm font-medium">Brief Summary</p>
      <form onSubmit={handleSubmit} className="mt-7">
        <div className="flex flex-wrap justify-between items-center">
          <label className="font-medium">Add Summary</label>
          <Button
            type="button"
            className="fex  items-center gap-2 border-primary"
            variant="outline"
            size="sm"
            onClick={handleGenerate}
          >
            <BrainCircuit
              size={'16px'}
              className={`${
                loadingGenerate ? ' animate-pulse' : 'animate-none'
              }`}
            />{' '}
            Generate with AI
          </Button>
        </div>
        <Textarea
          rows={10}
          className="mt-4"
          onChange={handleInputChange}
          value={summary}
          required
        />
        <div className="flex justify-end  mt-4">
          <Button disabled={loading} type="submit" className="flex gap-1">
            {loading && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </form>

      {generatedSummaryList.length > 0 && (
        <div className="mt-5">
          <h2 className="font-bold text-lg">Generated Suggestions</h2>
          {generatedSummaryList.map((item, idx) => (
            <div key={idx} className="mt-2 border rounded-lg px-3 py-2">
              <h2 className="mb-1 text-sm font-medium flex items-center justify-between">
                Experience Level: {item.experience_level}{' '}
                <span onClick={() => handleCopyToClipboard(item.summary, idx)}>
                  {copiedIdx === idx ? (
                    <Check size={'14px'} />
                  ) : (
                    <ClipboardCopy className="cursor-pointer" size={'14px'} />
                  )}
                </span>
              </h2>
              <p className="text-sm text-pretty">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
