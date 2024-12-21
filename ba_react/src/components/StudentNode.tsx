import React from 'react'
import { Student } from '../types/Student';

type StudentNodeProps = {
  student: Student;
  onClick: (student: Student) => void;
};

const StudentNode: React.FC<StudentNodeProps> = ({ student, onClick }) => {

  const iconPath = `${process.env.PUBLIC_URL}/static/icons/${student.detail.impl_order}.png`;

  return (
    <div 
      onClick = {() => onClick(student)}
      className='flex flex-col items-center w-32 h-auto bg-sky-50 border border-gray-300 rounded-md shadow-sm'
    >
      <img className='w-32 h-32 rounded-md object-contain' src={iconPath} alt="icon" />
      <p className='p-2 text-sm font-extrabold text-center text-gray-600 leading-tight overflow-hidden whitespace-nowrap text-ellipsis scale-y-90'>
        {student.detail.name}
      </p>
    </div>
  )
}

export default StudentNode