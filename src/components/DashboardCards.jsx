import {
  FaFolderOpen,
  FaClock,
  FaSpinner,
  FaExclamationCircle,
  FaRegClock,
} from "react-icons/fa";

function DashboardCards({ stats }) {
  const cards = [
    {
      title: "TOTAL CASES",
      value: stats?.totalCases || 0,
      icon: <FaFolderOpen />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "NEW / UNASSIGNED",
      value: stats?.newCases || 0,
      icon: <FaClock />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "IN PROGRESS",
      value: stats?.inProgressCases || 0,
      icon: <FaSpinner />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "OVERDUE",
      value: stats?.overdueCases || 0,
      icon: <FaRegClock />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            
            <div>
              <p className="text-sm text-gray-500 font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.color}`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;