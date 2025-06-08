
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

const ActivityPage = () => {
  const recentActivity = [
    {
      date: '2024-01-15',
      clockIn: '09:15 AM',
      clockOut: '05:45 PM',
      totalHours: '8h 30m',
      breaks: '45m',
      status: 'Late',
    },
    {
      date: '2024-01-14',
      clockIn: '08:45 AM',
      clockOut: '05:30 PM',
      totalHours: '8h 45m',
      breaks: '60m',
      status: 'On Time',
    },
    {
      date: '2024-01-13',
      clockIn: '09:00 AM',
      clockOut: '06:15 PM',
      totalHours: '9h 15m',
      breaks: '45m',
      status: 'Overtime',
    },
  ];

  const monthlyStats = {
    totalDays: 20,
    presentDays: 18,
    lateDays: 3,
    overtimeHours: 12.5,
    totalHours: 164.5,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Report</h1>
        <p className="text-gray-600">Track your attendance and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{monthlyStats.totalDays}</h3>
            <p className="text-sm text-gray-600">Total Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</h3>
            <p className="text-sm text-gray-600">Present Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-orange-600">{monthlyStats.lateDays}</h3>
            <p className="text-sm text-gray-600">Late Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{monthlyStats.overtimeHours}h</h3>
            <p className="text-sm text-gray-600">Overtime</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-indigo-600">{monthlyStats.totalHours}h</h3>
            <p className="text-sm text-gray-600">Total Hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{activity.date}</p>
                    <p className="text-sm text-gray-600">
                      {activity.clockIn} - {activity.clockOut}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.totalHours}</p>
                    <p className="text-xs text-gray-600">Break: {activity.breaks}</p>
                  </div>
                  
                  <Badge className={
                    activity.status === 'On Time' ? 'bg-green-100 text-green-700' :
                    activity.status === 'Late' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPage;
