
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceChart = () => {
  const data = [
    { day: 'Mon', present: 185, absent: 15, late: 8 },
    { day: 'Tue', present: 192, absent: 8, late: 5 },
    { day: 'Wed', present: 178, absent: 22, late: 12 },
    { day: 'Thu', present: 187, absent: 13, late: 7 },
    { day: 'Fri', present: 195, absent: 5, late: 3 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="present" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Present"
          />
          <Line 
            type="monotone" 
            dataKey="absent" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Absent"
          />
          <Line 
            type="monotone" 
            dataKey="late" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Late"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
