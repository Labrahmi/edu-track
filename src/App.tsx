import React, { useState } from 'react';
import { Bus, UserCheck, Users, UserX } from 'lucide-react';
import StudentList from './components/StudentList';
import StatusHeader from './components/StatusHeader';
import GradeSelector from './components/GradeSelector';
import Header from './components/Header';
import { Student, AttendanceStatus } from './types';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Emma Thompson', status: 'absent', grade: 1, imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 2, name: 'Lucas Chen', status: 'absent', grade: 1, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 3, name: 'Sofia Rodriguez', status: 'absent', grade: 2, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 4, name: 'Alexander Kim', status: 'absent', grade: 2, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 5, name: 'Isabella Patel', status: 'absent', grade: 3, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100' },
  ]);

  const updateStatus = (studentId: number, status: AttendanceStatus) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const filteredStudents = students.filter(student => student.grade === selectedGrade);
  
  const statusCounts = {
    present: filteredStudents.filter(s => s.status === 'present').length,
    parent: filteredStudents.filter(s => s.status === 'parent').length,
    bus: filteredStudents.filter(s => s.status === 'bus').length,
    absent: filteredStudents.filter(s => s.status === 'absent').length,
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header isDarkMode={isDarkMode} onDarkModeToggle={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="max-w-6xl mx-auto p-6 pt-24">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Student Attendance</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage student departures</p>
            </div>
            <GradeSelector 
              selectedGrade={selectedGrade} 
              onGradeChange={setSelectedGrade}
              isDarkMode={isDarkMode}
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusHeader
            icon={<UserCheck className="w-6 h-6" />}
            label="Present"
            count={statusCounts.present}
            color="emerald"
            isDarkMode={isDarkMode}
          />
          <StatusHeader
            icon={<Users className="w-6 h-6" />}
            label="With Parent"
            count={statusCounts.parent}
            color="blue"
            isDarkMode={isDarkMode}
          />
          <StatusHeader
            icon={<Bus className="w-6 h-6" />}
            label="Bus Service"
            count={statusCounts.bus}
            color="amber"
            isDarkMode={isDarkMode}
          />
          <StatusHeader
            icon={<UserX className="w-6 h-6" />}
            label="Absent"
            count={statusCounts.absent}
            color="red"
            isDarkMode={isDarkMode}
          />
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Student List</h2>
          </div>
          {filteredStudents.length > 0 ? (
            <StudentList 
              students={filteredStudents} 
              onUpdateStatus={updateStatus}
              isDarkMode={isDarkMode}
            />
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No students found in grade {selectedGrade}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;