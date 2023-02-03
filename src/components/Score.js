import { FaArrowUp } from "react-icons/fa";

const Score = ({ predictions }) => {
  return (
    <>
      <div className="text-gray-100 py-4 lg:max-w-[50vw]">
        <h3 className="text-center font-extrabold text-gray-200 text-2xl my-2">
          Probabilities
        </h3>
        <div className="w-screen lg:max-w-[50vw] p-4 md:px-8 grid grid-cols-10">
          {predictions.map((value, idx) => (
            <div className="flex flex-col items-center">
              <span className="font-bold py-2">{idx}</span>
              <div
                className="bg-gradient-to-t from-gray-400 to-gray-100 
                          h-[300px] flex items-end w-8 md:w-12 rounded-md"
              >
                <div
                  className="bg-gradient-to-t from-pink-400 to-purple-400 w-full rounded-md mx-auto"
                  style={{ height: `${value * 300}px` }}
                />
              </div>
              <span className="mt-6 rotate-45 font-thin">
                {(value * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            document.getElementById("section-1").scrollIntoView();
          }}
          className="mt-3 text-gray-400 underline flex mx-auto text-sm lg:hidden"
        >
          To the top
          <FaArrowUp className="text-gray-400 ml-1 translate-y-0.5" />
        </button>
      </div>
    </>
  );
};

export default Score;
