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
            <div className="group">
              <div
                className="flex flex-col items-center
                          transition-all ease-in-out group-hover:scale-[1.05]"
              >
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
                <span className="mt-6 rotate-45 font-thin transition-all ease-in-out group-hover:rotate-0">
                  {(value * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 transition-all ease-in-out hover:text-gray-200 group">
          <button
            onClick={() => {
              document.getElementById("section-1").scrollIntoView();
            }}
            className="mt-3 underline flex mx-auto text-sm lg:hidden group-hover:scale-[1.05]"
          >
            To the top
            <FaArrowUp className="ml-1 translate-y-0.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Score;
