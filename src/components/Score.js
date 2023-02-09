import { FaArrowUp } from "react-icons/fa";

const Score = ({ predictions, mostLikely }) => {
  return (
    <div className="text-gray-100 py-2 lg:max-w-[50vw]">
      <h3 className="text-center font-extrabold text-gray-200 text-2xl my-2">
        Probabilities
      </h3>
      <div className="w-screen lg:max-w-[55vw] p-4 md:px-8 grid grid-cols-10">
        {predictions.map((value, idx) => (
          <div className="group" key={value + idx}>
            <div className="flex flex-col items-center">
              <span className="font-bold py-2">{idx}</span>
              <div
                className="bg-gradient-to-t from-gray-400 to-gray-100 
                          h-[16rem] flex items-end w-6 md:w-12 rounded-md"
              >
                <div
                  style={{
                    height: `${value * 16}rem`,
                    transition: "all",
                  }}
                  className={`bg-gradient-to-t from-pink-400 to-purple-400 
                            w-full h-64 rounded-md mx-auto group-hover:bg-green-200 animate-slideup ${
                              window.innerWidth > 1020 ? "nodelay" : "delayed"
                            }`}
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
      <h4
        className={`text-center font-extrabold text-transparent text-4xl bg-clip-text 
                        bg-gradient-to-r from-purple-400 to-pink-600 my-2 py-2 animate-slow-pulse`}
      >
        Did you draw a {predictions.indexOf(mostLikely)}?
      </h4>
    </div>
  );
};

export default Score;
