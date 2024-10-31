export type AttendanceStatus = 'present' | 'parent' | 'bus' | 'absent';

export interface Student {
  id: number;
  name: string;
  status: AttendanceStatus;
  imageUrl: string;
  grade: number;
  MainClass: string;
  ExternalCode: string;
}

export interface StudentsByGrade {
  [grade: number]: Student[];
}