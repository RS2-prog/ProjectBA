import React, { useEffect, useState } from 'react'
import { Detail, HelperStudent, Student } from '../types/Student';
import { useError } from '../context/ErrorContext';
import HelperTHead from '../components/HelperTHead';
import HelperTBody from '../components/HelperTBody';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api';

interface HelperSearchResponse {
  helpers: HelperStudent[];
}

const HeperSearchPage: React.FC = () => {
  // 状態管理
  // ローディング
  const [loading, setLoading] = useState<boolean>(true);
  // 表示リスト
  const [helpers, setHelpers] = useState<HelperStudent[]>([]);
  // エラー管理
  const {addError} = useError();
  // 検索パラメータ
  const [searchParams] = useSearchParams();
  const content = searchParams.get('content');
  const name = searchParams.get('name');

  const getSearchResult = async () => {
    setLoading(true);
    try {
      const helpersData = await api.get<HelperSearchResponse>(`/helpers/search?content=${content}&name=${name}`);
      setHelpers(helpersData.data.helpers);
    } catch (error) {
      addError("検索結果の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [name, content]);

  // ソート適用
  const sortByKey = (key: keyof Student | `detail.${keyof Detail}`, order: string) => {
    return [...helpers].sort((a, b) => {
      const valueA = key.startsWith('detail.') ? a.student.detail[key.split('.')[1] as keyof Detail] : a.student[key as keyof Student]; 
      const valueB = key.startsWith('detail.') ? b.student.detail[key.split('.')[1] as keyof Detail] : b.student[key as keyof Student]; 
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
    setHelpers(sortByKey(key, order));
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className='h-[95%] w-[95%] flex m-auto'>
      <div className='h-full w-full overflow-y-auto'>
        <table className='w-full m-auto border-separate border-spacing-y-2 table-auto overflow-visible'>
          <thead className='top-0'>
            <HelperTHead
              onChangeSortConfig={handleSortOrderChange}
            />
          </thead>
          <tbody className='h-auto'>
            {helpers.map((helper, index) => (
              <HelperTBody
                key={index}
                helper={helper}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HeperSearchPage