import { ClipLoader } from "react-spinners";

type LoadingProps = {
  isLoading: boolean;
  children?: React.ReactNode;
};

const Loading = ({ isLoading, children }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <div className="fixed h-full w-full flex justify-center items-center backdrop-blur-[10px] z-50">
          <ClipLoader
            color="black"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {children}
    </>
  );
};

export default Loading;
