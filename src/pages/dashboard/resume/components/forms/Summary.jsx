import { BrainCircuit, Check, ClipboardCopy, Loader2 } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Textarea } from '../../../../../components/ui/textarea';
import ResumeDataContext from '../../../../../context/ResumeDataContext';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { updateResume } from '../../../../../http/api';
import { useParams } from 'react-router-dom';
import { aiChatSession } from '../../../../../services/generativeAi';
import { getPrompt } from '../../../../../lib/utils';

const Summary = ({ setEnableNxtBtn }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { resumeId } = useParams();
  const [summary, setSummary] = useState('');
  const [generatedSummaryList, setGeneratedSummaryList] = useState([]);
  const [isLoading, setIsLoading] = useState({
    submit: false,
    generate: false,
  });
  const [copiedIdx, setCopiedIdx] = useState(null);
  const timeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setSummary(e.target.value);
    setResumeData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleCopyToClipboard = (summary, idx) => {
    navigator.clipboard.writeText(summary);
    setCopiedIdx(idx);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCopiedIdx(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleGenerate = async () => {
    setIsLoading((prev) => ({ ...prev, generate: true }));
    const prompt = getPrompt(resumeData?.jobTitle);
    const result = await aiChatSession.sendMessage(prompt);
    setGeneratedSummaryList(JSON.parse(result.response.text()));
    setIsLoading((prev) => ({ ...prev, generate: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, submit: true }));

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
      setIsLoading((prev) => ({ ...prev, submit: false }));
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
            className="flex items-center gap-2 border-primary"
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isLoading.generate}
          >
            <BrainCircuit
              size={16}
              className={isLoading.generate ? 'animate-pulse' : 'animate-none'}
            />
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
        <div className="flex justify-end mt-4">
          <Button
            disabled={isLoading.submit}
            type="submit"
            className="flex gap-1"
          >
            {isLoading.submit && <Loader2 className="animate-spin" />}
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
                Experience Level: {item.experience_level}
                <span onClick={() => handleCopyToClipboard(item.summary, idx)}>
                  {copiedIdx === idx ? (
                    <Check size={14} />
                  ) : (
                    <ClipboardCopy className="cursor-pointer" size={14} />
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
