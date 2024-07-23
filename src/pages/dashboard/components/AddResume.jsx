import { Loader2, PlusSquareIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { createResume } from '../../../http/api';
import UserContext from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // try to extract the handle submit logic
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const uuid = uuidv4();
    const resumeData = {
      data: {
        title,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    console.log(resumeData);
    try {
      const {
        data: { data },
      } = await createResume(resumeData);
      console.log(data.documentId, uuid);
      navigate(`/dashboard/resume/${uuid}/edit`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div
          className="w-36 h-40
         px-14 py-24 border-dashed border-2 flex  items-center justify-center bg-secondary rounded-lg hover:scale-105 transition-all hover:shadow-md  cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <PlusSquareIcon />
        </div>
        <h2 className="text-center mt-1">New</h2>
      </div>
      {/* Use alert dialog instead of dialog */}
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Begin New Resume</DialogTitle>
            <DialogDescription>
              Enter your resume title
              <Input
                className="my-2"
                placeholder="Ex: Frontend Engineer"
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button disabled={!title || loading} onClick={handleSubmit}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
