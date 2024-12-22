import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Student } from '../types/Student';
import { StudentChoices } from '../types/StudentChoices';

type StudentProps = {
  student: Student;
  choices: StudentChoices;
  onConfirm: (updatedStudent: Student) => void;
};

const StudentTBody: React.FC<StudentProps> = ({ student, choices }) => {
  // ステート
  // モード状態
  const [dispMode, setDispMode] = useState<boolean>(true);

  // 表示生徒
  const [thisStudent, setThisStudent] = useState<Student>({...student});

  useEffect(() => {
    setThisStudent({...student});
  }, [student]);

  // 表示 -> 編集
  const changeToEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDispMode(false);
  };

  // 編集 -> 表示
  const changeToDispMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    setThisStudent(student);
    setDispMode(true);
  };

  // アイコン画像取得
  const iconPath = `${process.env.PUBLIC_URL}/static/icons/${student.detail.impl_order}.png`;

  // 編集による状態更新(コンポーネント内のみ)
  const updateStudentField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedStudent = { ...thisStudent, [event.target.name]: event.target.value };
    setThisStudent(updatedStudent);
  }

  return (
    <tr className='w-full rounded-lg shadow-md bg-white'>
      <td className='text-center text-gray-600 p-2 h-32'>
        <img src={iconPath} alt='' className='rounded-md h-full object-contain'/>
      </td>
      <td className='text-center text-gray-600'>{thisStudent.detail.name}</td>
      <td className='text-center text-gray-600'>
        {dispMode
          ? (thisStudent.rank)
          : (<select name='rank' value={thisStudent.rank} onChange={updateStudentField} 
              className='text-center w-[95%] mx-auto border border-sky-600 outline-none rounded-md'
            >
              {choices?.rank_choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode
          ? (thisStudent.level)
          : (<select name='level' value={thisStudent.level} onChange={updateStudentField}>
              {Array.from(
                { length: choices.level_range.max - choices.level_range.min + 1 },
                (_, i) => i + choices.level_range.min
               ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.ex) 
          : (<select name='ex' value={thisStudent.ex} onChange={updateStudentField}>
              {Array.from(
                { length: choices.ex_skill_range.max - choices.ex_skill_range.min + 1 },
                (_, i) => i + choices.ex_skill_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.ns) 
          : (<select name='ns' value={thisStudent.ns} onChange={updateStudentField}>
              {Array.from(
                { length: choices.skill_range.max - choices.skill_range.min + 1 },
                (_, i) => i + choices.skill_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.ss) 
          : (<select name='ss' value={thisStudent.ss} onChange={updateStudentField}>
              {Array.from(
                { length: choices.skill_range.max - choices.skill_range.min + 1 },
                (_, i) => i + choices.skill_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.ps) 
          : (<select name='ps' value={thisStudent.ps} onChange={updateStudentField}>
              {Array.from(
                { length: choices.skill_range.max - choices.skill_range.min + 1 },
                (_, i) => i + choices.skill_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.equip_1) 
          : (<select name='equip_1' value={thisStudent.equip_1} onChange={updateStudentField}>
              {Array.from(
                { length: choices.equip_range.max - choices.equip_range.min + 1 },
                (_, i) => i + choices.equip_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.equip_2) 
          : (<select name='equip_2' value={thisStudent.equip_2} onChange={updateStudentField}>
              {Array.from(
                { length: choices.equip_range.max - choices.equip_range.min + 1 },
                (_, i) => i + choices.equip_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.equip_3) 
          : (<select name='equip_3' value={thisStudent.equip_3} onChange={updateStudentField}>
              {Array.from(
                { length: choices.equip_range.max - choices.equip_range.min + 1 },
                (_, i) => i + choices.equip_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.lim_health) 
          : (<select name='lim_health' value={thisStudent.lim_health} onChange={updateStudentField}>
              {Array.from(
                { length: choices.limit_range.max - choices.limit_range.min + 1 },
                (_, i) => i + choices.limit_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.lim_attach) 
          : (<select name='lim_attach' value={thisStudent.lim_attach} onChange={updateStudentField}>
              {Array.from(
                { length: choices.limit_range.max - choices.limit_range.min + 1 },
                (_, i) => i + choices.limit_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.lim_heal) 
          : (<select name='lim_heal' value={thisStudent.lim_heal} onChange={updateStudentField}>
              {Array.from(
                { length: choices.limit_range.max - choices.limit_range.min + 1 },
                (_, i) => i + choices.limit_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode 
          ? (thisStudent.relationship) 
          : (<select name='relationship' value={thisStudent.relationship} onChange={updateStudentField}>
              {Array.from(
                { length: choices.relationship_range.max - choices.relationship_range.min + 1 },
                (_, i) => i + choices.relationship_range.min
                ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>)
        }
      </td>
      <td className='text-center text-gray-600'>
      {dispMode ? (
            <div>
              <button
                type='button'
                onClick={changeToEditMode}
              >
                <EditIcon style={{ color: 'rgb(2 132 199)' }} className='pointer-events-none'/>
              </button>
            </div>
          ) : (
            <div className='flex place-content-between w-2/3 mx-auto'>
              <button
                type='button'
              >
                <CheckCircleIcon style={{ color: 'green' }} className='pointer-events-none'/>
              </button>
              <button
                type='button'
                onClick={changeToDispMode}
              >
                <CancelIcon style={{ color: 'red' }} className='pointer-events-none'/>
              </button>
            </div>
          )
        }
      </td>
    </tr>
  )
};

export default StudentTBody