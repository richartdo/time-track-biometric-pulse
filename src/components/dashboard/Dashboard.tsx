
import { useState } from 'react';
import Sidebar from './Sidebar';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import EmployeeManagement from './EmployeeManagement';
import AttendanceReports from './AttendanceReports';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardProps {
  userRole: 'admin' | 'employee' | null;
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    if (userRole === 'employee') {
      return <EmployeeDashboard />;
    }

    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'reports':
        return <AttendanceReports />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar
          userRole={userRole}
          activeView={activeView}
          onViewChange={setActiveView}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
