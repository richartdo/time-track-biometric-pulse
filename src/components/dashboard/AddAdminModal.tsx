
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAdmin: (admin: any) => void;
}

const AddAdminModal = ({ isOpen, onClose, onAddAdmin }: AddAdminModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adminId: '',
    password: '',
    confirmPassword: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.adminId || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    const newAdmin = {
      id: Date.now(),
      ...formData,
      role: 'admin',
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
    };

    onAddAdmin(newAdmin);
    toast({
      title: "Success",
      description: `Admin ${formData.name} added successfully`,
    });
    
    setFormData({
      name: '',
      email: '',
      adminId: '',
      password: '',
      confirmPassword: '',
    });
    onClose();
  };

  const generateAdminId = () => {
    const randomNum = Math.floor(Math.random() * 999) + 1;
    const adminId = `ADM${String(randomNum).padStart(3, '0')}`;
    setFormData(prev => ({ ...prev, adminId }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            Add New Admin
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-name">Full Name *</Label>
            <Input
              id="admin-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="admin-email">Email *</Label>
            <Input
              id="admin-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="admin-id">Admin ID *</Label>
            <div className="flex gap-2">
              <Input
                id="admin-id"
                value={formData.adminId}
                onChange={(e) => setFormData(prev => ({ ...prev, adminId: e.target.value }))}
                placeholder="ADM001"
                required
              />
              <Button type="button" variant="outline" onClick={generateAdminId}>
                Generate
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="admin-password">Password *</Label>
            <Input
              id="admin-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirm Password *</Label>
            <Input
              id="confirm-password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              Add Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
