import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Activity, CheckCircle } from 'lucide-react';
import RealtimeClock from '../common/RealtimeClock';
import BiometricModal from './BiometricModal';
import { useToast } from '@/hooks/use-toast';

const EmployeeDashboard = () => {
  const [biometricModal, setBiometricModal] = useState<{
    isOpen: boolean;
    action: 'clock-in' | 'clock-out' | 'break';
  }>({
    isOpen: false,
    action: 'clock-in',
  });
  
  const [todayStats, setTodayStats] = useState({
    clockIn: '09:15 AM',
    clockOut: '--:--',
    breakTime: '45 min',
    totalHours: '7h 30m',
    isOnBreak: false,
    isClockedIn: true,
  });

  const { toast } = useToast();

  const weeklyHours = [
    { day: 'Mon', hours: 8.0, status: 'complete' },
    { day: 'Tue', hours: 7.5, status: 'complete' },
    { day: 'Wed', hours: 8.2, status: 'complete' },
    { day: 'Thu', hours: 8.0, status: 'complete' },
    { day: 'Fri', hours: 4.5, status: 'current' },
    { day: 'Sat', hours: 0, status: 'upcoming' },
    { day: 'Sun', hours: 0, status: 'upcoming' },
  ];

  const handleBiometricAction = (action: 'clock-in' | 'clock-out' | 'break') => {
    setBiometricModal({ isOpen: true, action });
  };

  const handleBiometricSuccess = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    if (biometricModal.action === 'clock-out') {
      setTodayStats(prev => ({
        ...prev,
        clockOut: currentTime,
        isClockedIn: false,
      }));
    } else if (biometricModal.action === 'break') {
      setTodayStats(prev => ({
        ...prev,
        isOnBreak: !prev.isOnBreak,
      }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Track your attendance and manage your time</p>
        </div>
        <RealtimeClock />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Clock In</p>
                  <p className="text-xl font-bold text-green-600">{todayStats.clockIn}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Clock Out</p>
                  <p className="text-xl font-bold text-gray-600">{todayStats.clockOut}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Break Time</p>
                  <p className="text-xl font-bold text-blue-600">{todayStats.breakTime}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-xl font-bold text-purple-600">{todayStats.totalHours}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                {todayStats.isClockedIn ? (
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => handleBiometricAction('clock-out')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Clock Out
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleBiometricAction('clock-in')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Clock In
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleBiometricAction('break')}
                  disabled={!todayStats.isClockedIn}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {todayStats.isOnBreak ? 'End Break' : 'Start Break'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                This Week's Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyHours.map((day) => (
                  <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        day.status === 'complete' ? 'bg-green-100 text-green-700' :
                        day.status === 'current' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {day.hours}h
                      </span>
                      {day.status === 'complete' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold">164h 30m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overtime</span>
                <span className="font-semibold text-orange-600">12h 15m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Present</span>
                <span className="font-semibold text-green-600">18/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">On-time Rate</span>
                <span className="font-semibold text-blue-600">94%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Clock In</p>
                <p className="text-gray-600">Today, 09:15 AM</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Clock Out</p>
                <p className="text-gray-600">Yesterday, 05:45 PM</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Clock In</p>
                <p className="text-gray-600">Yesterday, 09:00 AM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BiometricModal
        isOpen={biometricModal.isOpen}
        onClose={() => setBiometricModal(prev => ({ ...prev, isOpen: false }))}
        action={biometricModal.action}
        onSuccess={handleBiometricSuccess}
      />
    </div>
  );
};

export default EmployeeDashboard;
