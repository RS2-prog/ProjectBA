import React, { useState } from 'react'
import { Student, Detail } from '../types/Student';
import SortButton from './SortButton';

type StudentTHeadProps = {
  onChangeSortConfig: (key: keyof Student | `detail.${keyof Detail}`, order: string) => void;
};

const StudentTHead: React.FC<StudentTHeadProps> = ({ onChangeSortConfig }) => {

  const switchOrder = (name: string) => {
    if (name === 'asc' ) {
      return 'desc';
    } else if (name === 'desc') {
      return 'none';
    } else {return 'asc'}
  }

  const [orderOfName, setOrderOfName] = useState<string>('none');
  const onSortName = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = 'detail.name';
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfName(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfRank, setOrderOfRank] = useState<string>('none');
  const onSortRank = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = 'rank';
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfRank(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfLevel, setOrderOfLevel] = useState<string>('none');
  const onSortLevel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = 'level';
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfLevel(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfRelationship, setOrderOfRelationship] = useState<string>('none');
  const onSortRelationship = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = 'relationship';
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfRelationship(order);
    onChangeSortConfig(key, order);
  };

  return (
    <tr className='w-full shadow-md bg-sky-200'>
      <th className='text-gray-600 w-32'></th>
      <th className='text-gray-600'>名前<SortButton onClick={onSortName} order={orderOfName}/></th>
      <th className='text-gray-600'>星・固有<SortButton onClick={onSortRank} order={orderOfRank}/></th>
      <th className='text-gray-600'>レベル<SortButton onClick={onSortLevel} order={orderOfLevel}/></th>
      <th className='text-gray-600'>
        <div className='flex'>
          <p className='text-gray-600 w-1/4'>EX</p>
          <p className='text-gray-600 w-1/4'>NS</p>
          <p className='text-gray-600 w-1/4'>SS</p>
          <p className='text-gray-600 w-1/4'>PS</p>
        </div>
      </th>
      <th className='text-gray-600'>装備</th>
      <th className='text-gray-600'>能力解放</th>
      <th className='text-gray-600'>絆ランク<SortButton onClick={onSortRelationship} order={orderOfRelationship}/></th>
      <th className='text-gray-600'></th>
    </tr>
  )
}

export default StudentTHead