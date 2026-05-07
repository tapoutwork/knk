import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      <Sidebar />

      <div className="ml-[260px]">
        
        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;