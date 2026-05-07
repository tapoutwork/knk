import { FaEye } from "react-icons/fa";

const RecentCasesTable = ({ cases }) => {

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Recent Cases
        </h2>

        <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
          View All
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left text-gray-500 border-b">

              <th className="pb-4">App ID</th>
              <th className="pb-4">Candidate</th>
              <th className="pb-4">City</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Assigned To</th>
              <th className="pb-4">Created</th>
              <th className="pb-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {cases?.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-5 font-medium">
                  {item.comp_ref_no}
                </td>

                <td className="py-5">
                  {item.candidate_name}
                </td>

                <td className="py-5">
                  {item.city}
                </td>

                <td className="py-5">

                  <span className="
                    px-4 py-1 rounded-full text-sm font-medium
                    bg-blue-100 text-blue-600
                  ">
                    {item.check_status}
                  </span>

                </td>

                <td className="py-5">

                  {item.assignedTo?.name || "Unassigned"}

                </td>

                <td className="py-5">

                  {new Date(item.createdAt).toLocaleDateString()}

                </td>

                <td className="py-5 text-center">

                  <button className="
                    w-10 h-10 rounded-full
                    bg-gray-100 hover:bg-blue-500
                    hover:text-white transition
                    flex items-center justify-center mx-auto
                  ">
                    <FaEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentCasesTable;