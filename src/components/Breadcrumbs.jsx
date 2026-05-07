const Breadcrumbs = ({ title }) => {
  return (
    <div className="mb-6">

      <h1 className="text-4xl font-bold text-gray-900">
        {title}
      </h1>

      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
        <span>Home</span>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          {title}
        </span>
      </div>

    </div>
  );
};

export default Breadcrumbs;