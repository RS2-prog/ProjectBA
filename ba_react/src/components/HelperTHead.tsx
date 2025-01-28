import React, { useState } from 'react'
import { Detail, Student } from '../types/Student';
import SortButton from './SortButton';

type HelperTHeadProps = {
  onChangeSortConfig: (key: keyof Student | `detail.${keyof Detail}`, order: string) => void;
};

const HelperTHead: React.FC<HelperTHeadProps> = ({ onChangeSortConfig }) => {
  
  const switchOrder = (name: string) => {
    if (name === 'asc' ) {
      return 'desc';
    } else if (name === 'desc') {
      return 'none';
    } else {return 'asc'}
  }

  const [orderOfName, setOrderOfName] = useState<string>('none');
  const onSortName = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("here");
    const key = 'detail.name';
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    console.log(target);
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

  const [orderOfEx, setOrderOfEx] = useState<string>('none');
  const onSortEx = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "ex";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfEx(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfNs, setOrderOfNs] = useState<string>('none');
  const onSortNs = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "ns";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfNs(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfSs, setOrderOfSs] = useState<string>('none');
  const onSortSs = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "ss";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfSs(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfPs, setOrderOfPs] = useState<string>('none');
  const onSortPs = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "ps";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfPs(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfEquip1, setOrderOfEquip1] = useState<string>('none');
  const onSortEquip1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "equip_1";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfEquip1(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfEquip2, setOrderOfEquip2] = useState<string>('none');
  const onSortEquip2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "equip_2";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfEquip2(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfEquip3, setOrderOfEquip3] = useState<string>('none');
  const onSortEquip3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "equip_3";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfEquip3(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfLimHealth, setOrderOfLimHealth] = useState<string>('none');
  const onSortLimHealth = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "lim_health";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfLimHealth(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfLimAttach, setOrderOfLimAttach] = useState<string>('none');
  const onSortLimAttach = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "lim_attach";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfLimAttach(order);
    onChangeSortConfig(key, order);
  };

  const [orderOfLimHeal, setOrderOfLimHeal] = useState<string>('none');
  const onSortLimHeal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = "lim_heal";
    const target = event.target as HTMLButtonElement;
    const name = target.name;
    const order = switchOrder(name);
    setOrderOfLimHeal(order);
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
      <th className='text-gray-600 w-[149px]'>名前<SortButton onClick={onSortName} order={orderOfName}/></th>
      <th className='text-gray-600 w-[104px]'>星・固有<SortButton onClick={onSortRank} order={orderOfRank}/></th>
      <th className='text-gray-600 w-[78px]'>レベル<SortButton onClick={onSortLevel} order={orderOfLevel}/></th>
      <th className='text-gray-600 w-[60px]'>EX<SortButton onClick={onSortEx} order={orderOfEx}/></th>
      <th className='text-gray-600 w-[60px]'>NS<SortButton onClick={onSortNs} order={orderOfNs}/></th>
      <th className='text-gray-600 w-[60px]'>SS<SortButton onClick={onSortSs} order={orderOfSs}/></th>
      <th className='text-gray-600 w-[60px]'>PS<SortButton onClick={onSortPs} order={orderOfPs}/></th>
      <th className='text-gray-600 w-[65px]'>装備1<SortButton onClick={onSortEquip1} order={orderOfEquip1}/></th>
      <th className='text-gray-600 w-[65px]'>装備2<SortButton onClick={onSortEquip2} order={orderOfEquip2}/></th>
      <th className='text-gray-600 w-[65px]'>装備3<SortButton onClick={onSortEquip3} order={orderOfEquip3}/></th>
      <th className='text-gray-600 w-[110px]'>WB最大HP<SortButton onClick={onSortLimHealth} order={orderOfLimHealth}/></th>
      <th className='text-gray-600 w-[110px]'>WB攻撃力<SortButton onClick={onSortLimAttach} order={orderOfLimAttach}/></th>
      <th className='text-gray-600 w-[110px]'>WB回復力<SortButton onClick={onSortLimHeal} order={orderOfLimHeal}/></th>
      <th className='text-gray-600 w-[100px]'>絆ランク<SortButton onClick={onSortRelationship} order={orderOfRelationship}/></th>
      <th className='text-gray-600 w-[100px]'>先生</th>
      <th className='text-gray-600 w-[100px]'>フレンドコード</th>
    </tr>
  )
}

export default HelperTHead
