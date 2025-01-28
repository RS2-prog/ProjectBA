import React, { useState } from 'react'
import { Button, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Check, ContentCopy } from "@mui/icons-material";
import { HelperStudent } from '../types/Student';

type HelperStudentProps = {
  helper: HelperStudent;
};
 
const HelperTBody: React.FC<HelperStudentProps> = ({ helper }) => {
  // 状態管理
  // コピー状態
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(helper.friend_code ? helper.friend_code : '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // アイコン画像取得
  const iconPath = `${process.env.PUBLIC_URL}/static/icons/${helper.student.detail.impl_order}.png`;

  return (
    <tr className='w-full rounded-lg shadow-md bg-white'>
      <td className='text-center text-gray-600 p-2 h-32'>
        <img src={iconPath} alt="" className='rounded-md h-full object-contain' />
      </td>
      <td className='text-center text-gray-600'>{helper.student.detail.name}</td>
      <td className='text-center text-gray-600'>{helper.student.rank}</td>
      <td className='text-center text-gray-600'>{helper.student.level}</td>
      <td className='text-center text-gray-600'>{helper.student.ex}</td>
      <td className='text-center text-gray-600'>{helper.student.ns}</td>
      <td className='text-center text-gray-600'>{helper.student.ss}</td>
      <td className='text-center text-gray-600'>{helper.student.ps}</td>
      <td className='text-center text-gray-600'>{helper.student.equip_1}</td>
      <td className='text-center text-gray-600'>{helper.student.equip_2}</td>
      <td className='text-center text-gray-600'>{helper.student.equip_3}</td>
      <td className='text-center text-gray-600'>{helper.student.lim_health}</td>
      <td className='text-center text-gray-600'>{helper.student.lim_attach}</td>
      <td className='text-center text-gray-600'>{helper.student.lim_heal}</td>
      <td className='text-center text-gray-600'>{helper.student.relationship}</td>
      <td className='text-center text-gray-600'>{helper.teacher_name}</td>
      <td className='text-center text-gray-600'>
        <div className='flex text-center align-middle justify-center items-center'>
          <p className='lex justify-center items-center p-0 m-0 h-full'>{helper.friend_code}</p>
          <IconButton color={copied ? "success" : "default"} onClick={handleCopy}>
            {copied ? <Check /> : <ContentCopy />}
          </IconButton>
        </div>
      </td>
    </tr>
  )
}
 
export default HelperTBody
