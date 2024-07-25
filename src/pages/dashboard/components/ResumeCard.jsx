import { NotebookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumeCardSkeleton = () => {
  return (
    <div className="w-36 h-40 px-14 py-24  border-2 flex flex-col items-center justify-center bg-gray-200 rounded-lg animate-pulse">
      <NotebookIcon className="absolute z-10 animate-pulse" />
    </div>
  );
};

const ResumeCard = ({ resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume?.documentId}/edit`}>
      <div
        className="w-36 h-40
         px-14 py-24 border border-1 flex  items-center justify-center bg-secondary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer"
      >
        <NotebookIcon />
      </div>
      <h2 className="text-center mt-1">{resume?.title}</h2>
    </Link>
  );
};

export default ResumeCard;
