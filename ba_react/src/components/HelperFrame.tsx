import React, { useState } from 'react'
import { HelperStudent } from '../types/Student';
import Button from './Button';

type HelperFrameProps = {
  title: string;
  helpers: HelperStudent[];
  onClick: (helper: HelperStudent) => void;
};


const HelperFrame: React.FC<HelperFrameProps> = ({ title, helpers, onClick }) => {

  return (
    <div className='h-[85%] my-auto flex-none w-[31%] bg-white rounded-lg shadow-lg ml-9'>
      <div className='my-2 w-[90%] mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-600 border-b-2 border-sky-600'>{title}</h1>
      </div>
      
        {helpers.map((helper) => (
          <div className='rounded-lg shadow-lg border-sky-200 border w-[90%] mx-auto my-4 flex place-content-between'>
            <div className='text-center text-gray-600 p-2 h-32 flex items-center'>
              <img 
                src={`${process.env.PUBLIC_URL}/static/icons/${helper.student.detail.impl_order}.png`} 
                alt='' 
                className='rounded-md h-full object-contain border-2 border-sky-200'
              />
              <p className='ml-4 font-bold'>{helper.student.detail.name}</p>
            </div>
            <div className='items-center flex pr-6'>
              <Button
                text='設定'
                type='button'
                onClick={() => onClick(helper)}
              />
            </div>
          </div>
        ))}
      
    </div>
  )
}

export default HelperFrame