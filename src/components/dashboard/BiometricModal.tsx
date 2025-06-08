
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Fingerprint, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'clock-in' | 'clock-out' | 'break';
  onSuccess: () => void;
}

const BiometricModal = ({ isOpen, onClose, action, onSuccess }: BiometricModalProps) => {
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    setScanning(true);
    
    // Simulate biometric scanning
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      
      setTimeout(() => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        toast({
          title: "Success",
          description: `${action === 'clock-in' ? 'Clock In' : action === 'clock-out' ? 'Clock Out' : 'Break'} recorded at ${time}`,
        });
        
        onSuccess();
        setSuccess(false);
        onClose();
      }, 1500);
    }, 3000);
  };

  useEffect(() => {
    if (!isOpen) {
      setScanning(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const getActionText = () => {
    switch (action) {
      case 'clock-in': return 'Clock In';
      case 'clock-out': return 'Clock Out';
      case 'break': return 'Start Break';
      default: return 'Scan';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Biometric Authentication</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className={`p-8 rounded-full ${
            success ? 'bg-green-100' : scanning ? 'bg-blue-100 animate-pulse' : 'bg-gray-100'
          }`}>
            {success ? (
              <CheckCircle className="h-16 w-16 text-green-600" />
            ) : (
              <Fingerprint className={`h-16 w-16 ${
                scanning ? 'text-blue-600' : 'text-gray-600'
              }`} />
            )}
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              {success ? 'Authentication Successful' : 
               scanning ? 'Scanning...' : 
               `Place your finger to ${getActionText()}`}
            </h3>
            <p className="text-gray-600">
              {success ? `${getActionText()} has been recorded` :
               scanning ? 'Please keep your finger on the scanner' :
               'Position your finger on the biometric scanner'}
            </p>
          </div>
          
          {!scanning && !success && (
            <Button onClick={handleScan} className="w-full">
              Start Scan
            </Button>
          )}
          
          {scanning && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BiometricModal;
