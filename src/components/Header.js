import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-900 text-center py-2 md:py-8 fixed top-0 w-full">
      <h1
        className="pb-2 font-extrabold text-transparent text-3xl md:text-5xl bg-clip-text 
                        bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Digit Predictor
      </h1>
      <h2 className="font-thin text-gray-100">By Torger Bocianowski</h2>
    </div>
  );
};

export default Header;
