const Header = () => {
  return (
    <div
      id="header"
      className="bg-gray-900 text-center py-4 md:py-8 shadow-md
                    fixed top-0 w-full transition-all duration-0"
    >
      <h1
        className="pb-2 font-extrabold text-transparent text-3xl md:text-7xl bg-clip-text 
                        bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Digit Predictor
      </h1>
      <h2 className="font-thin md:text-2xl text-gray-100">
        By Torger Bocianowski
      </h2>
    </div>
  );
};

export default Header;
