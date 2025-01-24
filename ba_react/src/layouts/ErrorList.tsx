import React from 'react';
import { useError } from '../context/ErrorContext';

const ErrorList = () => {
  const { errors, removeError } = useError();

  return (
    <div className='fixed top-4 left-4 z-[1000]'>
      {errors.map((error) => (
        <div
          key={error.id}
          className='bg-red-500 text-white py-2 px-4 mb-2 rounded-md shadow-md flex'
        >
          <span>{error.message}</span>
          <button
            onClick={() => removeError(error.id)}
            className='ml-2 bg-white text-red-500 border-none rounded-full cursor-pointer w-6 h-6 flex items-center justify-center font-bold'
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ErrorList;
