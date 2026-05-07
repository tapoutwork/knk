import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCards from "../components/DashboardCards";
import RecentCasesTable from "../components/RecentCasesTable";

import API from "../api/axios";

function Dashboard() {

  const [stats, setStats] = useState({
    totalCases: 0,
    newCases: 0,
    inProgressCases: 0,
    overdueCases: 0,
  });

  const [recentCases, setRecentCases] = useState([]);

  // FETCH DASHBOARD STATS
  const fetchStats = async () => {

    try {

      const res = await API.get("/cases/stats");

      setStats(res.data.data);

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  // FETCH RECENT CASES
  const fetchRecentCases = async () => {

    try {

      const res = await API.get("/cases?limit=5");

      setRecentCases(res.data.data);

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  useEffect(() => {

    fetchStats();
    fetchRecentCases();

  }, []);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* DASHBOARD CARDS */}
        <DashboardCards stats={stats} />

        {/* RECENT CASES TABLE */}
        <RecentCasesTable cases={recentCases} />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;