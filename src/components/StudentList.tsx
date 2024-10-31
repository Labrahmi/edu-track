import React from 'react';
import { Bus, UserCheck, Users, UserX } from 'lucide-react';
import { Student, AttendanceStatus } from '../types';
import confetti from 'canvas-confetti';

interface StudentListProps {
  students: Student[];
  onUpdateStatus: (id: number, status: AttendanceStatus) => void;
  isDarkMode: boolean;
}

const StudentList: React.FC<StudentListProps> = ({ students, onUpdateStatus, isDarkMode }) => {
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      scalar: 0.8,
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500'],
    });

    fire(0.2, {
      spread: 60,
      decay: 0.91,
      scalar: 0.75,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.92,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      shapes: ['circle'],
    });
  };

  const handleStatusUpdate = (id: number, status: AttendanceStatus) => {
    onUpdateStatus(id, status);
    if (status === 'present') {
      triggerConfetti();
    }
  };

  const getStatusButton = (status: AttendanceStatus, currentStatus: AttendanceStatus, onClick: () => void) => {
    const baseClasses = "p-2 rounded-full transition-colors duration-200";
    const isActive = status === currentStatus;
    
    const variants = isDarkMode ? {
      present: isActive ? "bg-emerald-900/50 text-emerald-400" : "hover:bg-emerald-900/30 text-gray-500",
      parent: isActive ? "bg-blue-900/50 text-blue-400" : "hover:bg-blue-900/30 text-gray-500",
      bus: isActive ? "bg-amber-900/50 text-amber-400" : "hover:bg-amber-900/30 text-gray-500",
      absent: isActive ? "bg-red-900/50 text-red-400" : "hover:bg-red-900/30 text-gray-500",
    } : {
      present: isActive ? "bg-emerald-100 text-emerald-700" : "hover:bg-emerald-50 text-gray-400",
      parent: isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 text-gray-400",
      bus: isActive ? "bg-amber-100 text-amber-700" : "hover:bg-amber-50 text-gray-400",
      absent: isActive ? "bg-red-100 text-red-700" : "hover:bg-red-50 text-gray-400",
    };

    const icons = {
      present: <UserCheck className="w-5 h-5" />,
      parent: <Users className="w-5 h-5" />,
      bus: <Bus className="w-5 h-5" />,
      absent: <UserX className="w-5 h-5" />,
    };

    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${variants[status]}`}
        title={`Mark as ${status}`}
      >
        {icons[status]}
      </button>
    );
  };

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {students.map((student) => (
        <div key={student.id} className={`flex items-center justify-between px-6 py-4 ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} group`}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={student.imageUrl}
                alt={student.name}
                className={`w-10 h-10 rounded-full object-cover border-2 transition-all duration-300 ${
                  student.status === 'present'
                    ? 'border-emerald-400 scale-110'
                    : isDarkMode
                    ? 'border-gray-600'
                    : 'border-gray-100'
                }`}
              />
              {student.status === 'present' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
              )}
            </div>
            <div>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {student.name}
              </span>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Grade {student.grade}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {getStatusButton('present', student.status, () => handleStatusUpdate(student.id, 'present'))}
            {getStatusButton('parent', student.status, () => handleStatusUpdate(student.id, 'parent'))}
            {getStatusButton('bus', student.status, () => handleStatusUpdate(student.id, 'bus'))}
            {getStatusButton('absent', student.status, () => handleStatusUpdate(student.id, 'absent'))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;