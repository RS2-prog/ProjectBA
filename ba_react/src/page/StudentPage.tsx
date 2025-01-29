import React, { useEffect, useState } from 'react'
import StudentTBody from '../components/StudentTBody'
import StudentTHead from '../components/StudentTHead'
import { Student, Detail, StudentFilter } from '../types/Student'
import api from '../api/api'
import { StudentChoices } from '../types/StudentChoices'
import SelectFilter from '../components/SelectFilter'
import FuncButton from '../components/FuncButton'
import { useError } from '../context/ErrorContext'

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

const defaultFilter: StudentFilter = {
  damage_type: '',
  armor_type: '',
  position: '',
  role: '',
  s_class: '',
  school: '',
};

const StudentPage: React.FC  = () => {
  // ステート
  // ローディング
  const [loading, setLoading] = useState<boolean>(true);
  // 表示リスト状態
  const [ownedStudents, setOwnedStudents] = useState<Student[]>([]);
  const [notOwnedStudents, setNotOwnedStudents] = useState<Student[]>([]);
  const [displayStudents, setDisplayStudents] = useState<Student[]>([]);
  // 選択肢
  const [choices, setChoices] = useState<StudentChoices>(defaultChoices);
  // フィルター
  const [filter, setFilter] = useState<StudentFilter>(defaultFilter);
  // エラー管理
  const {addError} = useError();

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
      setDisplayStudents(owned);

      const choicesResponse = await api.get('/students/choices/');
      const choices: StudentChoices = choicesResponse.data;
      setChoices(choices);
    } catch (error) {
      addError("生徒情報の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyStudents();
  }, []);

  // フィルター更新
  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    setFilter({...filter, [field]: value});
  };

  // フィルター適用
  const applyFilter = () => {
    let studentList = [...ownedStudents];
    (Object.keys(filter) as (keyof StudentFilter)[]).forEach(key => {
      if (filter[key]) {
        studentList = studentList.filter(student => student.detail[key] === filter[key]);
      }
    });
    setDisplayStudents(studentList);
  };

  // フィルターリセット
  const resetFilter = (eveng: React.MouseEvent<HTMLButtonElement>) => {
    setFilter(defaultFilter);
  };

  useEffect(() => {
    applyFilter();
  }, [filter]);

  // ソート適用
  const sortByKey = (key: keyof Student | `detail.${keyof Detail}`, order: string) => {
    return [...displayStudents].sort((a, b) => {
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
    setDisplayStudents(sortByKey(key, order));
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
      setDisplayStudents((prev) => 
        prev.map((student) => (student.detail.id === updatedStudent.detail.id ? updatedStudent : student))
      );
    } catch (error) {
      console.log(error);
    };
  };

  // thead固定
  const stickyThead = () => {

  };

  if (loading) return <div>Loading...</div>

  return (
    <div className='h-[95%] w-[95%] flex m-auto'>
      <div className='h-full w-1/5 bg-sky-200 rounded-lg shadow-lg shadow-gray-300 flex flex-col place-content-between'>
      <div className='mx-auto w-[85%] mt-4'>
        <h1 className='text-2xl font-semibold text-gray-600 border-b-2 border-sky-600'>所属生徒</h1>
      </div> 
      <div className='mx-auto w-[85%] flex-1'>
        <div>
          <div className='my-4 flex place-content-between'>
            <h2 className='text-xl font-semibold text-gray-600 '>Filter</h2>
            <FuncButton 
              text='リセット'
              type='button'
              onClick={resetFilter}
            />
            </div>
          <SelectFilter 
            label='攻撃タイプ'
            name='damage_type'
            choices={choices.damage_type_choices}
            value={filter['damage_type']}
            onChange={handleChangeFilter}
          />
          <SelectFilter 
            label='防御タイプ'
            name='armor_type'
            choices={choices.armor_type_choices}
            value={filter['armor_type']}
            onChange={handleChangeFilter}
          />
          <SelectFilter 
            label='ポジション'
            name='position'
            choices={choices.position_choices}
            value={filter['position']}
            onChange={handleChangeFilter}
          />
          <SelectFilter 
            label='ロール'
            name='role'
            choices={choices.role_choices}
            value={filter['role']}
            onChange={handleChangeFilter}
          />
          <SelectFilter 
            label='クラス'
            name='s_class'
            choices={choices.class_choices}
            value={filter['s_class']}
            onChange={handleChangeFilter}
          />
          <SelectFilter 
            label='学校'
            name='school'
            choices={choices.school_choices}
            value={filter['school']}
            onChange={handleChangeFilter}
          />
        </div>   
      </div>
        
      <div className='mx-auto w-[85%] mb-4'>
        <a href="/mystudents/register" className='font-bold text-gray-600 text-xl'>所属生徒登録へ</a>
      </div>
        
      </div>
      <div className='h-full w-4/5 ml-6 overflow-y-auto'>
        <table className='relative z-10 w-full m-auto border-separate border-spacing-y-2 table-auto overflow-visible'>
          <thead className='sticky top-0'>
            <StudentTHead onChangeSortConfig={handleSortOrderChange}/>
          </thead>
          <tbody className='h-auto'>
            {displayStudents.map((student, index) => (
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