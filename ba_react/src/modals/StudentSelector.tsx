import React from 'react'
import { Student } from '../types/Student';

type StudentSelectorProps = {
  isOpen: boolean;
  students: Student[];
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StudentSelector: React.FC<StudentSelectorProps> = ({ isOpen, students, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => onClose}
    >
      <div className='flex'>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default StudentSelector