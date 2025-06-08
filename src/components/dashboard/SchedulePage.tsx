
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const SchedulePage = () => {
  const schedule = [
    {
      day: 'Monday',
      date: '2024-01-15',
      shift: 'Morning',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      location: 'Main Office',
      status: 'Scheduled',
    },
    {
      day: 'Tuesday',
      date: '2024-01-16',
      shift: 'Morning',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      location: 'Main Office',
      status: 'Scheduled',
    },
    {
      day: 'Wednesday',
      date: '2024-01-17',
      shift: 'Morning',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      location: 'Remote',
      status: 'Scheduled',
    },
    {
      day: 'Thursday',
      date: '2024-01-18',
      shift: 'Morning',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      location: 'Main Office',
      status: 'Scheduled',
    },
    {
      day: 'Friday',
      date: '2024-01-19',
      shift: 'Morning',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      location: 'Main Office',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600">View your upcoming work schedule</p>
      </div>

      <div className="grid gap-4">
        {schedule.map((day, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{day.day}</p>
                    <p className="text-sm text-gray-600">{day.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">
                        {day.timeIn} - {day.timeOut}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{day.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {day.shift}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    {day.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
