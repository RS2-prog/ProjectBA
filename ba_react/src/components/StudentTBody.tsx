import React, { useState } from 'react'
import { Student } from '../types/Student';
import Button from './Button';

type StudentProps = {
  student: Student;
};

const StudentTBody: React.FC<StudentProps> = ({ student }) => {

  const [dispMode, setDispMode] = useState<boolean>(true);

  const changeToEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDispMode(false);
  };

  const changeToDispMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDispMode(true);
  };

  // const icons = require.context('./path/to/icons', false, /\.(png|jpe?g|svg)$/);
  // const iconImage = icons(`./${student.icon_path}`);
  const iconImage = undefined;

  return (
    <tr className='w-full rounded-lg shadow-md bg-white'>
      <td className='text-center text-gray-600 p-2 h-32'>
        <img src={iconImage} alt='' className='rounded-md h-full object-contain'/>
      </td>
      <td className='text-center text-gray-600'>{student.detail.name}</td>
      <td className='text-center text-gray-600'>
        {dispMode
          ? (student.rank)
          : (<select name='rank' value={student.rank}></select>)
        }
      </td>
      <td className='text-center text-gray-600'>
      {dispMode
          ? (student.level)
          : (<select name='level' value={student.level}></select>)
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode ? (
            <div className='flex'>
              <p className='w-1/4 text-center text-gray-600'>{student.ex}</p>
              <p className='w-1/4 text-center text-gray-600'>{student.ns}</p>
              <p className='w-1/4 text-center text-gray-600'>{student.ss}</p>
              <p className='w-1/4 text-center text-gray-600'>{student.ps}</p>
            </div>
          ) : (
            <div className='flex'>
              <select className='w-1/4 text-center text-gray-600' name='ex' value={student.ex}></select>
              <select className='w-1/4 text-center text-gray-600' name='ns' value={student.ns}></select>
              <select className='w-1/4 text-center text-gray-600' name='ss' value={student.ss}></select>
              <select className='w-1/4 text-center text-gray-600' name='ps' value={student.ps}></select>
            </div>
          )
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode ? (
            <div className='flex'>
              <p className='w-1/3 text-center text-gray-600'>{student.equip_1}</p>
              <p className='w-1/3 text-center text-gray-600'>{student.equip_2}</p>
              <p className='w-1/3 text-center text-gray-600'>{student.equip_3}</p>
            </div>
          ) : (
            <div className='flex'>
              <select className='w-1/3 text-center text-gray-600' name='equip_1' value={student.equip_1}></select>
              <select className='w-1/3 text-center text-gray-600' name='equip_2' value={student.equip_2}></select>
              <select className='w-1/3 text-center text-gray-600' name='equip_3' value={student.equip_3}></select>
            </div>
          )
        }
      </td>
      <td className='text-center text-gray-600'>
        {dispMode ? (
            <div className='flex'>
              <p className='w-1/3 text-center text-gray-600'>{student.lim_health}</p>
              <p className='w-1/3 text-center text-gray-600'>{student.lim_attach}</p>
              <p className='w-1/3 text-center text-gray-600'>{student.lim_heal}</p>
            </div>
          ) : (
            <div className='flex'>
              <select className='w-1/3 text-center text-gray-600' name='lim_health' value={student.lim_health}></select>
              <select className='w-1/3 text-center text-gray-600' name='lim_attach' value={student.lim_attach}></select>
              <select className='w-1/3 text-center text-gray-600' name='lim_heal' value={student.lim_heal}></select>
            </div>
          )
        }
      </td>
      <td className='text-center text-gray-600'>{student.relationship}</td>
      <td className='text-center text-gray-600'>
      {dispMode ? (
            <div>
              <Button
                text='編集'
                type='button'
                onClick={changeToEditMode}
              />
              <Button
                text='追加'
                type='button'
              />
            </div>
          ) : (
            <div>
              <Button
                text='保存'
                type='button'
              />
              <Button
                text='取消'
                type='button'
                onClick={changeToDispMode}
              />
            </div>
          )
        }
      </td>
    </tr>
  )
};

export default StudentTBody