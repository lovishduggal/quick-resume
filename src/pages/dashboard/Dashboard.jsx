import AddResume from './components/AddResume';

const Dashboard = () => {
  return (
    <div className="max-w-screen-lg lg:m-auto p-10 text-center md:text-left ">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p>Begin building a new resume with AI assistance.</p>
      <div
        className="grid grid-cols-1 place-items-center xs:grid-cols-2 md:place-items-start md:grid-cols-3 lg:grid-cols-5 gap-8 Class
Properties
 mt-10"
      >
        <AddResume />
        <AddResume />
        <AddResume />
      </div>
    </div>
  );
};

export default Dashboard;
