import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import RealtimeClock from '../common/RealtimeClock';
import AttendanceChart from '../common/AttendanceChart';
import EmployeeListModal from './EmployeeListModal';

const AdminDashboard = () => {
  const [selectedEmployeeList, setSelectedEmployeeList] = useState<{
    isOpen: boolean;
    title: string;
    statusFilter: 'Present' | 'Absent' | 'Late';
  }>({
    isOpen: false,
    title: '',
    statusFilter: 'Present',
  });

  const stats = [
    {
      title: 'Total Employees',
      value: '245',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Present Today',
      value: '187',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      clickable: true,
      statusFilter: 'Present' as const,
    },
    {
      title: 'Absent Today',
      value: '28',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      clickable: true,
      statusFilter: 'Absent' as const,
    },
    {
      title: 'Late Arrivals',
      value: '12',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      clickable: true,
      statusFilter: 'Late' as const,
    },
  ];

  // Mock employee data for the modal
  const employeeData = [
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'Present' as const, clockIn: '09:15 AM', clockOut: '' },
    { id: 2, name: 'Sarah Smith', department: 'Marketing', status: 'Present' as const, clockIn: '08:45 AM', clockOut: '05:30 PM' },
    { id: 3, name: 'Mike Johnson', department: 'Sales', status: 'Late' as const, clockIn: '09:30 AM', clockOut: '' },
    { id: 4, name: 'Emily Brown', department: 'HR', status: 'Absent' as const },
  ];

  const recentActivity = [
    { name: 'John Doe', action: 'Clock In', time: '09:15 AM', status: 'late' },
    { name: 'Sarah Smith', action: 'Clock Out', time: '05:30 PM', status: 'on-time' },
    { name: 'Mike Johnson', action: 'Clock In', time: '08:45 AM', status: 'on-time' },
    { name: 'Emily Brown', action: 'Clock Out', time: '06:15 PM', status: 'overtime' },
  ];

  const handleStatClick = (stat: any) => {
    if (stat.clickable) {
      setSelectedEmployeeList({
        isOpen: true,
        title: `${stat.title} - ${stat.value} Employees`,
        statusFilter: stat.statusFilter,
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor attendance and manage your workforce</p>
        </div>
        <RealtimeClock />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card 
            key={stat.title} 
            className={`hover:shadow-lg transition-shadow ${stat.clickable ? 'cursor-pointer' : ''}`}
            onClick={() => handleStatClick(stat)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-full p-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attendance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'on-time' ? 'bg-green-100 text-green-700' :
                      activity.status === 'late' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {activity.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <EmployeeListModal
        isOpen={selectedEmployeeList.isOpen}
        onClose={() => setSelectedEmployeeList(prev => ({ ...prev, isOpen: false }))}
        title={selectedEmployeeList.title}
        employees={employeeData}
        statusFilter={selectedEmployeeList.statusFilter}
      />
    </div>
  );
};

export default AdminDashboard;
