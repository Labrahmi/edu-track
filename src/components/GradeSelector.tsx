import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface GradeSelectorProps {
  selectedGrade: number;
  onGradeChange: (grade: number) => void;
  isDarkMode: boolean;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ selectedGrade, onGradeChange, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getGradeText = (grade: number) => {
    const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };
    return `${grade}${grade <= 3 ? suffixes[grade as 1 | 2 | 3] : 'th'} Grade`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 text-left ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
        } border rounded-lg shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
        flex items-center gap-2 min-w-[160px]`}
      >
        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          {getGradeText(selectedGrade)}
        </span>
        <ChevronDown
          className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } border rounded-lg shadow-lg max-h-60 overflow-auto`}>
          <div className="py-1">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => {
                  onGradeChange(grade);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left transition-colors duration-150
                          ${isDarkMode
                            ? selectedGrade === grade
                              ? 'bg-indigo-900/50 text-indigo-300 font-medium'
                              : 'text-gray-300 hover:bg-gray-700'
                            : selectedGrade === grade
                              ? 'bg-indigo-50 text-indigo-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
              >
                {getGradeText(grade)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeSelector;