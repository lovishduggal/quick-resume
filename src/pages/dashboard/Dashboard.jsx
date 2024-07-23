import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import AddResume from './components/AddResume';
import { getUserResumes } from '../../http/api';
import ResumeCard, { ResumeCardSkeleton } from './components/ResumeCard';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [resumesList, setResumesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserResumesData = async () => {
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      try {
        const {
          data: { data },
        } = await getUserResumes(userEmail);
        setResumesList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserResumesData();
  }, []);

  return (
    <div className="max-w-screen-lg lg:m-auto px-6 text-center md:text-left ">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p>Begin building a new resume with AI assistance.</p>
      <div
        className="grid grid-cols-1 place-items-center xs:grid-cols-2 md:place-items-start md:grid-cols-3 lg:grid-cols-5 gap-8 Class
Properties
 mt-10"
      >
        <AddResume />
        {loading
          ? Array(3)
              .fill(0)
              .map((_, idx) => <ResumeCardSkeleton key={idx} />)
          : resumesList.map((resume) => (
              <ResumeCard resume={resume} key={resume.id} />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
