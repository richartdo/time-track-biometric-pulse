
import { 
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  FileText, 
  Clock, 
  LogOut, 
  Settings,
  Calendar,
  Activity,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  userRole: 'admin' | 'employee' | null;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ userRole, activeView, onViewChange, onLogout }: SidebarProps) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'admins', label: 'Admins', icon: Shield },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const employeeMenuItems = [
    { id: 'dashboard', label: 'My Attendance', icon: Clock },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : employeeMenuItems;

  return (
    <SidebarContainer className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2">
            <Clock className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">HRClock</h2>
            <p className="text-sm text-gray-500 capitalize">{userRole} Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onViewChange(item.id)}
                isActive={activeView === item.id}
                className={`w-full justify-start ${
                  activeView === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
