import React from 'react';

// Alert
interface AlertProps {
  variant: 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-500';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-500';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-500';
      default:
        return '';
    }
  };

  return (
    <div
      className={`p-4 border-l-4 rounded-md ${getVariantStyles()}`}
    >
      {children}
    </div>
  );
};

// AlertDescription
const AlertDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="text-sm">{children}</div>
);

// AlertTitle
const AlertTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="font-medium">{children}</div>
);

// AlertDialog
interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  children,
}) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity ${
      open ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
      {children}
    </div>
  </div>
);

// AlertDialogAction
interface AlertDialogActionProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
  >
    {children}
  </button>
);

export {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
};