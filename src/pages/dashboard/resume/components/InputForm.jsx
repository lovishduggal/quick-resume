import { ArrowLeft, ArrowRight, LayoutGridIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import PersonalDetails from './forms/PersonalDetails';
import { useState } from 'react';
import Summary from './forms/Summary';

const InputForm = () => {
  const [activeFormIdx, setActiveFormIdx] = useState(1);
  const [enableNxtBtn, setEnableNxtBtn] = useState(false);

  return (
    <div className="col-span-2 md:col-span-1">
      <div className="flex flex-wrap gap-1 justify-between items-center mb-8">
        <Button
          className="flex items-center gap-2"
          size="sm"
          variant={'outline'}
        >
          <LayoutGridIcon /> Theme
        </Button>
        <div className="flex items-center gap-2">
          {activeFormIdx > 0 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIdx((prev) => prev - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNxtBtn}
            className="flex items-center gap-2"
            size="sm"
            onClick={() => setActiveFormIdx((prev) => prev + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal detail */}
      {activeFormIdx === 0 && (
        <PersonalDetails setEnableNxtBtn={setEnableNxtBtn} />
      )}
      {/* Summary */}
      {activeFormIdx === 1 && <Summary setEnableNxtBtn={setEnableNxtBtn} />}
      {/* Experience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
};

export default InputForm;
