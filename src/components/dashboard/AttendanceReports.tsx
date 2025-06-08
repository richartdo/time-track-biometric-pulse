
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Download, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AttendanceReports = () => {
  const [dateFilter, setDateFilter] = useState('');
  const { toast } = useToast();

  const attendanceData = [
    {
      id: 1,
      employeeName: 'John Doe',
      date: '2024-01-15',
      clockIn: '09:15 AM',
      clockOut: '05:45 PM',
      totalHours: '8h 30m',
      status: 'Late',
      biometricId: 'BIO001',
    },
    {
      id: 2,
      employeeName: 'Sarah Smith',
      date: '2024-01-15',
      clockIn: '08:45 AM',
      clockOut: '05:30 PM',
      totalHours: '8h 45m',
      status: 'On Time',
      biometricId: 'BIO002',
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      date: '2024-01-15',
      clockIn: '09:00 AM',
      clockOut: '06:15 PM',
      totalHours: '9h 15m',
      status: 'Overtime',
      biometricId: 'BIO003',
    },
    {
      id: 4,
      employeeName: 'Emily Brown',
      date: '2024-01-15',
      clockIn: '--',
      clockOut: '--',
      totalHours: '0h 0m',
      status: 'Absent',
      biometricId: 'BIO004',
    },
  ];

  const filteredData = dateFilter 
    ? attendanceData.filter(record => record.date === dateFilter)
    : attendanceData;

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'On Time': 'bg-green-100 text-green-700',
      'Late': 'bg-red-100 text-red-700',
      'Overtime': 'bg-orange-100 text-orange-700',
      'Absent': 'bg-gray-100 text-gray-700',
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles] || ''}>
        {status}
      </Badge>
    );
  };

  const handleExportCSV = () => {
    const headers = ['Employee', 'Date', 'Clock In', 'Clock Out', 'Total Hours', 'Status', 'Biometric ID'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(record => [
        record.employeeName,
        record.date,
        record.clockIn,
        record.clockOut,
        record.totalHours,
        record.status,
        record.biometricId
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality would be implemented with a PDF library",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
          <p className="text-gray-600">View and export attendance data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Daily Attendance Report
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {dateFilter && (
              <Button variant="outline" onClick={() => setDateFilter('')}>
                Clear Filter
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Biometric ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeName}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut}</TableCell>
                  <TableCell>{record.totalHours}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {record.biometricId}
                    </code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600">187</h3>
              <p className="text-gray-600">Present Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-600">28</h3>
              <p className="text-gray-600">Absent Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-600">12</h3>
              <p className="text-gray-600">Late Arrivals</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceReports;
