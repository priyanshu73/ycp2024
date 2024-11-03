const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        id="loader"
        className="relative w-16 h-16 border-4 border-transparent rounded-full animate-spin" // Reduced size and border thickness
      >
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full border-t-[#a74040] transform rotate-[120deg]"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full border-t-[#40a744] animate-[spin_2s_ease-in-out_infinite] transform rotate-[240deg]"></div>
      </div>
    </div>
  );
};

export default Loader;
