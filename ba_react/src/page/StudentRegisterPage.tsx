import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Student } from '../types/Student';
import StudentNode from '../components/StudentNode';
import Button from '../components/Button';
import FuncButton from '../components/FuncButton';
import ConfirmModal from '../modals/ConfirmModal';
import { AnyFunction } from '../types/AnyFunction';

const StudentRegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ownedStudents, setOwnedStudents] = useState<Student[]>([]);
  const [notOwnedStudents, setNotOwnedStudents] = useState<Student[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [onConfirm, setOnConfirm] = useState<AnyFunction>(() => console.error('No Confirm Function'));
 
  // 所属、未所属生徒を取得する
  const getMyStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get('../students/register/');
      const students: Student[] = response.data;

      const [owned, notOwned] = students.reduce<[Student[], Student[]]>(
        (acc, student) => {
          if (student.isOwned) {
            acc[0].push(student);
          } else {
            acc[1].push(student);
          }
          return acc;
        },
        [[], []]
      );
      setOwnedStudents(owned);
      setNotOwnedStudents(notOwned);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyStudents();
  }, []);

  // 個別: 未所属 -> 所属
  const handleMoveNotOwnedStudent = (student: Student) => {
    setNotOwnedStudents((prev) =>
      prev.filter((s) => s.detail.id !== student.detail.id)
    );
    setOwnedStudents((prev) => [student, ...prev]);
  }

  // 個別: 所属 -> 未所属
  const handleMoveOwnedStudent = (student: Student) => {
    setOwnedStudents((prev) =>
      prev.filter((s) => s.detail.id !== student.detail.id)
    );
    setNotOwnedStudents((prev) => [student, ...prev]);
  }

  // 全体: 未所属 -> 所属
  const handleMoveAllNotOwned = () => {
    setConfirmMessage('未所属にいる生徒を全て所属に追加します、よろしいですか？');
    setOnConfirm(
      () => () => {
        setOwnedStudents((prev) => [...notOwnedStudents, ...prev]);
        setNotOwnedStudents([]);
        setIsConfirmModalOpen(false);
      }
    );
    setIsConfirmModalOpen(true);
  }

  // 全体: 所属 -> 未所属
  const handleMoveAllOwned = () => {
    setConfirmMessage('所属にいる生徒を全て未所持に戻します、よろしいですか?');
    setOnConfirm(
      () => () => {
        setNotOwnedStudents((prev) => [...ownedStudents, ...prev]);
        setOwnedStudents([]);
        setIsConfirmModalOpen(false);
      }
    );
    setIsConfirmModalOpen(true);
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className='w-full h-full'>
      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        message={confirmMessage}
        onConfirm={onConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
      <div className='w-[98%] h-[95%] flex flex-col mx-auto'>
        <h1 className='text-xl text-gray-600 font-extrabold'>・アイコンをクリックして反対側へ移動させる</h1>
        <div className='w-full h-[95%] flex gap-3'>
          <div className='flex-1 max-w-[calc(50%-0.5rem)] flex flex-col rounded-lg shadow-lg overflow-hidden'>
            <div className='h-16 bg-sky-200 flex items-center place-content-between px-4'>
              <p className='text-3xl text-gray-600 font-extrabold'>所属生徒</p>
              <FuncButton type='button' text='▶▶▶' onClick={handleMoveAllOwned}/>
              <div className='flex h-10'>
                <Button text='保存' type='button'/>
              </div>
            </div>
            <div className='grid grid-cols-6 auto-rows-[160px] overflow-y-scroll flex-1 p-4 gap-4 bg-white'>
              {ownedStudents.map((student) => (
                <StudentNode 
                  student={student} 
                  onClick={handleMoveOwnedStudent}
                />
              ))}
            </div>
          </div>
          <div className='flex-1 max-w-[calc(50%-0.5rem)] flex flex-col rounded-lg shadow-lg overflow-hidden'>
            <div className='h-16 bg-sky-200 flex items-center place-content-between px-4'>
              <p className='text-3xl text-gray-600 font-extrabold'>未所属生徒</p>
              <FuncButton type='button' text='◀◀◀' onClick={handleMoveAllNotOwned}/>
              <div className='flex h-10'>
                <Button text='リセット' type='button'/>
              </div>
            </div>
            <div className='grid grid-cols-6 auto-rows-[160px] overflow-y-scroll flex-1 p-4 gap-4 bg-white'>
              {notOwnedStudents.map((student) => (
                <StudentNode 
                  student={student} 
                  onClick={handleMoveNotOwnedStudent}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegisterPage