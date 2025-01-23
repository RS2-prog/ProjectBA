import React, { useEffect, useState } from 'react'
import { Student } from '../types/Student';
import Input from '../components/Input';
import StudentNode from '../components/StudentNode';
import Button from '../components/Button';

type StudentSelectorProps = {
  isOpen: boolean;
  students: Student[];
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onSelect: (student: Student | null) => void;
  onConfirm: () => void;
};

const StudentSelector: React.FC<StudentSelectorProps> = ({ isOpen, students, onClose, onSelect, onConfirm }) => {
  // 選択されている生徒
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  // フィルター
  const [filterParam, setFilterParam] = useState<string>('');
  // 初期化状態
  const [initialized, setInitialized] = useState<boolean>(false);

  const filterStudents: Student[] = students.filter(student => student.detail.name.includes(filterParam));

  const selectStudent = (student: Student) => {
    setSelectedStudent(student===selectedStudent? null : student);
    onSelect(student===selectedStudent? null : student);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam(event.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setFilterParam('');
      setSelectedStudent(null);
      setInitialized(true);
    } else {
      setInitialized(false);
    }
  }, [isOpen]);

  if (!isOpen || !initialized) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className='flex flex-col w-2/3 h-3/4 bg-sky-200 p-6 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full pb-4 flex place-content-between'>
          <p className='font-bold text-gray-600 text-3xl'>生徒選択</p>
          <Input
            type='text'
            name='student_nm'
            value={filterParam}
            placeholder='名前で探す'
            onChange={handleInputChange}
          />
        </div>
        <div className='overflow-auto'>
          <div className='grid grid-cols-9 gap-y-2 bg-white p-2 box-border'>
            {filterStudents.map(student => (
              <StudentNode 
                student={student} 
                isSelected={selectedStudent === student}
                onClick={selectStudent}/>
            ))}
          </div>
        </div>
        <div className='mt-4 flex place-content-between'>
          <Button
            text='閉じる'
            type='button'
            onClick={onClose}
          />
          <Button
            text='設定'
            type='button'
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentSelector