import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="fixed top-[50%] left-[50%]" data-testid="loading-spinner">
      <Spinner />
    </div>
  );
};
export default Loading;
