import React, { useEffect, useState } from 'react'
import StudentTBody from '../components/StudentTBody'
import StudentTHead from '../components/StudentTHead'
import { Student, Detail, StudentFilter } from '../types/Student'
import api from '../api/api'
import { StudentChoices } from '../types/StudentChoices'

const defaultChoices: StudentChoices = {
  rank_choices: [],
  level_range: {min:0, max:0},
  ex_skill_range: {min:0, max:0},
  skill_range: {min:0, max:0},
  equip_range: {min:0, max:0},
  limit_range: {min:0, max:0},
  relationship_range: {min:0, max:0},
  damage_type_choices: [],
  armor_type_choices: [],
  position_choices: [],
  role_choices: [],
  class_choices: [],
  school_choices: [],
}

const StudentPage: React.FC  = () => {
  // ステート
  // ローディング
  const [loading, setLoading] = useState<boolean>(true);
  // 表示リスト状態
  const [ownedStudents, setOwnedStudents] = useState<Student[]>([]);
  const [notOwnedStudents, setNotOwnedStudents] = useState<Student[]>([]);
  // 選択肢
  const [choices, setChoices] = useState<StudentChoices>(defaultChoices);
  // フィルター
  const [filter, setFilter] = useState<StudentFilter>();

  // 所属生徒を取得する
  const getMyStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/students/register/');
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

      const choicesResponse = await api.get('/students/choices/');
      const choices: StudentChoices = choicesResponse.data;
      console.log(choices);
      setChoices(choices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyStudents();
  }, []);

  // 所持ソート
  const sortByKey = (key: keyof Student | `detail.${keyof Detail}`, order: string) => {
    return [...ownedStudents].sort((a, b) => {
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
    setOwnedStudents(sortByKey(key, order));
  };

  // 個別生徒情報更新
  const updateSingleStudent = async (updatedStudent: Student) => {
    try {
      const response = await api.post('/students/update_student/', 
        { student: updatedStudent }
      );
      setOwnedStudents((prev) => 
        prev.map((student) => (student.detail.id === updatedStudent.detail.id ? updatedStudent : student))
      );
    } catch (error) {
      console.log(error);
    };
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className='h-[95%] w-[95%] flex m-auto'>
      <div className='h-full w-1/5 bg-sky-200 rounded-lg shadow-lg shadow-gray-300'>

      </div>
      <div className='h-full w-4/5 ml-6 overflow-y-auto'>
        <table className='h-[95%] w-full m-auto border-separate border-spacing-y-2 table-auto overflow-visible'>
          <thead className='sticky top-0'>
            <StudentTHead onChangeSortConfig={handleSortOrderChange}/>
          </thead>
          <tbody className='space-y-7 w-full'>
            {ownedStudents.map((student, index) => (
              <StudentTBody
                key={index}
                student={student}
                choices={choices}
                onConfirm={updateSingleStudent}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentPage