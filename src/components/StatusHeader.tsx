import React from 'react';

interface StatusHeaderProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: string;
  isDarkMode: boolean;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ icon, label, count, color, isDarkMode }) => {
  const colorClasses = isDarkMode ? {
    emerald: 'bg-emerald-900/30 text-emerald-400 border-emerald-900',
    blue: 'bg-blue-900/30 text-blue-400 border-blue-900',
    amber: 'bg-amber-900/30 text-amber-400 border-amber-900',
    red: 'bg-red-900/30 text-red-400 border-red-900',
  }[color] : {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }[color];

  return (
    <div className={`p-4 rounded-lg border ${colorClasses} flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
};

export default StatusHeader;