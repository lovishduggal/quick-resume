import { MutatingDots } from 'react-loader-spinner';
const Spinner = () => {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#01C4B9"
      secondaryColor="#01C4B9"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
