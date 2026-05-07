const Navbar = () => {
  return (
    <header className="h-24 bg-white border-b flex items-center justify-between px-10">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <span>Home</span>

          <span>/</span>

          <span className="text-gray-700 font-medium">
            Dashboard
          </span>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <div className="text-right">
          <h3 className="font-semibold">
            KNK Admin
          </h3>

          <p className="text-gray-500 text-sm">
            Admin
          </p>
        </div>

        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
          K
        </div>

      </div>

    </header>
  );
};

export default Navbar;