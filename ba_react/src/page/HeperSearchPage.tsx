import React, { useState } from 'react'
import { Student } from '../types/Student';
import { useError } from '../context/ErrorContext';

const HeperSearchPage: React.FC = () => {
  // 状態管理
  // ローディング
  const [loading, setLoading] = useState<boolean>(true);
  // 表示リスト
  const [helpers, setHelpers] = useState<Student[]>([]);
  // エラー管理
  const {addError} = useError();

  if (loading) return <div>Loading...</div>

  return (
    <div className='h-[95%] w-[95%] flex m-auto'>
      <div className='h-full w-full overflow-y-auto'>
        <table className='w-full m-auto border-separate border-spacing-y-2 table-auto overflow-visible'>
          <thead className='sticky top-0'>

          </thead>
          <tbody className='h-auto'>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HeperSearchPage