import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="fixed top-[50%] left-[50%]">
      <Spinner />
    </div>
  );
};
export default Loading;
