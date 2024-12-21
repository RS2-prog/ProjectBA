import React, { useState } from 'react'
import StudentTBody from '../components/StudentTBody'
import StudentTHead from '../components/StudentTHead'
import { Student, Detail } from '../types/Student'

const StudentPage: React.FC  = () => {

  const originStudents: Student[] = [
  ];

  const [students, setStudents] = useState<Student[]>(originStudents.slice());

  const sortByKey = (key: keyof Student | `detail.${keyof Detail}`, order: string) => {
    return [...students].sort((a, b) => {
      const valueA = key.startsWith('detail.') ? a.detail[key.split('.')[1] as keyof Detail] : a[key as keyof Student]; 
      const valueB = key.startsWith('detail.') ? b.detail[key.split('.')[1] as keyof Detail] : b[key as keyof Student]; 
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (order === 'asc') {
          return valueA.localeCompare(valueB, 'jp');
        } else if (order === 'desc') {
          return valueB.localeCompare(valueA, 'jp');
        }
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (order === 'asc') {
          return valueA - valueB;
        } else if (order === 'desc') {
          return valueB - valueA;
        }
      }
      return 0;
    });
  };

  const handleSortOrderChange = (key: keyof Student | `detail.${keyof Detail}`, order: string) => {
    setStudents(sortByKey(key, order));
  };

  return (
    <div className='h-[95%] w-[95%] flex m-auto'>
      <div className='h-full w-1/5 bg-sky-200 rounded-lg shadow-lg shadow-gray-300'>

      </div>
      <div className='h-full w-4/5 ml-6 overflow-y-auto'>
        <table className='h-[95%] w-[95%] m-auto border-separate border-spacing-y-2 table-auto overflow-visible'>
          <thead className='sticky top-0'>
            <StudentTHead onChangeSortConfig={handleSortOrderChange}/>
          </thead>
          <tbody className='space-y-7 w-full'>
            <StudentTBody student={students[0]}/>
            <StudentTBody student={students[1]}/>
            <StudentTBody student={students[2]}/>
            <StudentTBody student={students[3]}/>
            <StudentTBody student={students[4]}/>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentPage